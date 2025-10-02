import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { cors } from 'hono/cors'

const app = new Hono()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Landing Page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Executive Growth Diagnostic - Find Out Where You Stand Today</title>
        <meta name="description" content="A comprehensive diagnostic tool for senior executives to identify strengths, blind spots, and growth opportunities.">
        <link href="/static/style.css" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body>
        <!-- Header -->
        <header class="header">
            <div class="container">
                <div class="header-content">
                    <div class="header-top">
                        <a href="/" class="logo">
                            <img src="/static/logo.png" alt="Ryan Joswick" class="logo-image">
                        </a>
                        <a href="/questionnaire" class="btn-nav">
                            <i class="fas fa-clipboard-check"></i> Take Assessment
                        </a>
                    </div>
                    <nav class="header-nav">
                        <div class="nav-links">
                            <a href="#why" class="nav-link">Why This Matters</a>
                            <a href="#how" class="nav-link">How It Works</a>
                            <a href="#about" class="nav-link">About Ryan</a>
                        </div>
                    </nav>
                </div>
            </div>
        </header>

        <!-- Hero Section -->
        <section class="hero">
            <div class="container">
                <div class="hero-content fade-in">
                    <h1>Find Out Where You Stand Today</h1>
                    <p class="hero-subtext">
                        Every executive faces challenges. Some are clear. Others hide in plain sight. 
                        This tool helps you see what is working, what is not, and what to do about it.
                    </p>
                    <a href="/questionnaire" class="btn btn-primary">
                        <i class="fas fa-play-circle"></i> Start Your Diagnostic
                    </a>
                </div>
            </div>
        </section>

        <!-- Why This Matters Section -->
        <section id="why" class="section section-white">
            <div class="container">
                <div class="slide-up">
                    <h2 style="text-align: center; margin-bottom: 3rem;">Why This Matters</h2>
                    
                    <div class="grid grid-2" style="margin-bottom: 3rem;">
                        <div class="card">
                            <div class="card-icon">
                                <i class="fas fa-eye"></i>
                            </div>
                            <h3>Gain Clarity</h3>
                            <ul class="features-list">
                                <li>See where your time and energy are really going</li>
                                <li>Identify blind spots that may be slowing you down</li>
                                <li>Discover how aligned your team and strategy truly are</li>
                            </ul>
                        </div>
                        
                        <div class="card">
                            <div class="card-icon">
                                <i class="fas fa-rocket"></i>
                            </div>
                            <h3>Take Action</h3>
                            <ul class="features-list">
                                <li>Walk away with simple actions you can implement immediately</li>
                                <li>Get a personalized report based on your specific answers</li>
                                <li>Make faster, better decisions with clear insights</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div style="text-align: center;">
                        <a href="/questionnaire" class="btn btn-primary">
                            <i class="fas fa-arrow-right"></i> Begin the Assessment
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- How It Works Section -->
        <section id="how" class="section section-gray">
            <div class="container">
                <div class="slide-up">
                    <h2 style="text-align: center; margin-bottom: 3rem;">Simple and Actionable</h2>
                    
                    <div class="steps" style="max-width: 800px; margin: 0 auto 3rem;">
                        <div class="step">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <h4>Answer 24 Quick Questions</h4>
                                <p>Takes less than 10 minutes. Covers leadership, time management, team alignment, and growth strategy.</p>
                            </div>
                        </div>
                        
                        <div class="step">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <h4>Get Your Custom Growth Report</h4>
                                <p>Receive a detailed report sent directly to your inbox with personalized insights and scores.</p>
                            </div>
                        </div>
                        
                        <div class="step">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <h4>Make Faster, Better Decisions</h4>
                                <p>Use the actionable insights to address blind spots and accelerate your leadership growth.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div style="text-align: center;">
                        <a href="/questionnaire" class="btn btn-gold">
                            <i class="fas fa-chart-line"></i> Start Now
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Ryan Section -->
        <section id="about" class="section section-navy">
            <div class="container">
                <div class="slide-up" style="text-align: center; max-width: 800px; margin: 0 auto;">
                    <h2 style="color: var(--white); margin-bottom: 2rem;">About Ryan Joswick</h2>
                    <p style="font-size: 1.25rem; color: var(--gray-medium); margin-bottom: 2rem;">
                        Executive Coach & Advisor to senior sales leaders. Ryan helps executives and their teams 
                        break through growth barriers, optimize performance, and achieve sustainable results.
                    </p>
                    <p style="color: var(--gray-medium); margin-bottom: 3rem;">
                        With over a decade of experience coaching C-level executives, Ryan understands the 
                        unique challenges facing today's business leaders.
                    </p>
                    <a href="/questionnaire" class="btn btn-primary">
                        <i class="fas fa-user-check"></i> Get Your Executive Assessment
                    </a>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <!-- About Section -->
                    <div class="footer-section">
                        <img src="/static/logo.png" alt="Ryan Joswick" class="footer-logo">
                        <p>
                            Executive Coach & Advisor helping senior leaders break through growth barriers 
                            and achieve sustainable results.
                        </p>
                    </div>
                    
                    <!-- Quick Links -->
                    <div class="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="/"><i class="fas fa-home"></i> Home</a></li>
                            <li><a href="/questionnaire"><i class="fas fa-clipboard-check"></i> Take Assessment</a></li>
                            <li><a href="#about"><i class="fas fa-info-circle"></i> About Ryan</a></li>
                        </ul>
                    </div>
                    
                    <!-- Services -->
                    <div class="footer-section">
                        <h4>Services</h4>
                        <ul>
                            <li><a href="#"><i class="fas fa-user-tie"></i> Executive Coaching</a></li>
                            <li><a href="#"><i class="fas fa-users"></i> Team Development</a></li>
                            <li><a href="#"><i class="fas fa-chart-line"></i> Growth Strategy</a></li>
                            <li><a href="#"><i class="fas fa-handshake"></i> Leadership Advisory</a></li>
                        </ul>
                    </div>
                    
                    <!-- Connect -->
                    <div class="footer-section">
                        <h4>Connect</h4>
                        <p>Follow Ryan on social media for leadership insights and executive growth strategies.</p>
                        <div class="footer-social">
                            <a href="https://www.linkedin.com/in/ryanjoswick" target="_blank" rel="noopener" class="social-icon" title="LinkedIn">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                            <a href="https://twitter.com/ryanjoswick" target="_blank" rel="noopener" class="social-icon" title="Twitter">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="https://instagram.com/ryanjoswick" target="_blank" rel="noopener" class="social-icon" title="Instagram">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a href="mailto:ryan@example.com" class="social-icon" title="Email">
                                <i class="fas fa-envelope"></i>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; 2025 Ryan Joswick. All rights reserved. | Executive Coach & Advisor</p>
                </div>
            </div>
        </footer>

        <script>
            // Add smooth scrolling and animations
            document.addEventListener('DOMContentLoaded', function() {
                // Intersection Observer for animations
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                };

                const observer = new IntersectionObserver(function(entries) {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('fade-in');
                        }
                    });
                }, observerOptions);

                // Observe all sections
                document.querySelectorAll('.slide-up').forEach(el => {
                    observer.observe(el);
                });

                // Smooth scroll for anchor links
                document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                    anchor.addEventListener('click', function (e) {
                        e.preventDefault();
                        const target = document.querySelector(this.getAttribute('href'));
                        if (target) {
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    });
                });
            });
        </script>
    </body>
    </html>
  `)
})

// Questionnaire Page
app.get('/questionnaire', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Executive Assessment Questionnaire</title>
        <link href="/static/style.css" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body>
        <!-- Header -->
        <header class="header">
            <div class="container">
                <div class="header-content">
                    <a href="/" class="logo">
                        <img src="/static/logo.png" alt="Ryan Joswick" class="logo-image">
                    </a>
                    <nav>
                        <a href="/" class="btn-nav">
                            <i class="fas fa-home"></i> Back to Home
                        </a>
                    </nav>
                </div>
            </div>
        </header>

        <!-- Questionnaire Section -->
        <section class="section section-white" style="padding: 4rem 0;">
            <div class="container">
                <div class="card" style="max-width: 900px; margin: 0 auto;">
                    <div id="questionnaire-app">
                        <!-- Progress Bar -->
                        <div class="progress-bar">
                            <div class="progress-fill" id="progress-fill" style="width: 4%;"></div>
                        </div>
                        
                        <div id="question-counter">
                            <p>
                                Question <span id="current-question">1</span> of <span id="total-questions">25</span>
                            </p>
                        </div>

                        <!-- Contact Information Step -->
                        <div id="step-0" class="question-step active">
                            <h2 style="margin-bottom: 1.5rem;">Let's Get Started</h2>
                            <p style="margin-bottom: 2rem; color: var(--gray-text);">
                                Enter your information to receive your personalized diagnostic report instantly.
                            </p>
                            
                            <div class="form-group">
                                <label class="form-label" for="name">Full Name *</label>
                                <input type="text" id="name" class="form-input" required placeholder="Enter your full name">
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label" for="email">Email Address *</label>
                                <input type="email" id="email" class="form-input" required placeholder="Enter your email address">
                            </div>
                            
                            <button class="btn btn-primary" onclick="nextStep()" style="width: 100%;">
                                <i class="fas fa-arrow-right"></i> Continue to Assessment
                            </button>
                        </div>

                        <!-- Role Selection Step -->
                        <div id="step-1" class="question-step">
                            <h2 style="margin-bottom: 2rem;">What is your current role?</h2>
                            
                            <div class="radio-group">
                                <label class="radio-option">
                                    <input type="radio" name="role" value="CRO">
                                    <span>Chief Revenue Officer (CRO)</span>
                                </label>
                                <label class="radio-option">
                                    <input type="radio" name="role" value="CSO">
                                    <span>Chief Sales Officer (CSO)</span>
                                </label>
                                <label class="radio-option">
                                    <input type="radio" name="role" value="SVP">
                                    <span>SVP of Sales</span>
                                </label>
                                <label class="radio-option">
                                    <input type="radio" name="role" value="VP">
                                    <span>VP of Sales</span>
                                </label>
                                <label class="radio-option">
                                    <input type="radio" name="role" value="Founder">
                                    <span>Founder</span>
                                </label>
                                <label class="radio-option">
                                    <input type="radio" name="role" value="Other">
                                    <span>Other</span>
                                </label>
                            </div>
                            
                            <div style="display: flex; justify-content: space-between; margin-top: 2rem;">
                                <button class="btn btn-secondary" onclick="previousStep()">
                                    <i class="fas fa-arrow-left"></i> Back
                                </button>
                                <button class="btn btn-primary" onclick="nextStep()" disabled id="next-btn-1">
                                    <i class="fas fa-arrow-right"></i> Continue
                                </button>
                            </div>
                        </div>

                        <!-- Dynamic Question Steps will be generated here -->
                        <div id="dynamic-questions"></div>

                        <!-- Results Step -->
                        <div id="step-results" class="question-step">
                            <div style="text-align: center;">
                                <i class="fas fa-check-circle success-icon" style="font-size: 5rem; color: var(--blue-accent); margin-bottom: 2rem;"></i>
                                <h2 style="margin-bottom: 1.5rem;">Assessment Complete!</h2>
                                <p style="margin-bottom: 3rem; color: var(--gray-text); font-size: 1.25rem;">
                                    Thank you for completing the Executive Growth Diagnostic. 
                                    Your personalized 4-page report is ready to download instantly.
                                </p>
                                <button class="btn btn-gold" onclick="generateAndDownloadReport()" id="generate-report-btn">
                                    <i class="fas fa-download"></i> Download My Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
        <script src="/static/questionnaire.js"></script>
        <script src="/static/pdf-generator.js"></script>
    </body>
    </html>
  `)
})

// API endpoint to submit questionnaire
app.post('/api/submit-questionnaire', async (c) => {
  const data = await c.req.json()
  
  // TODO: Process data, calculate scores, generate PDF report
  console.log('Questionnaire submission:', data)
  
  // For now, return a success response
  return c.json({ 
    success: true, 
    message: 'Questionnaire submitted successfully',
    reportId: Math.random().toString(36).substr(2, 9)
  })
})

export default app