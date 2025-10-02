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
                    <a href="/" class="logo">Executive Growth Diagnostic</a>
                    <nav>
                        <a href="/questionnaire" class="btn btn-secondary">Take Assessment</a>
                    </nav>
                </div>
            </div>
        </header>

        <!-- Hero Section -->
        <section class="hero">
            <div class="container">
                <div class="hero-content fade-in">
                    <h1>Find out where you stand today</h1>
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
        <section class="section section-white">
            <div class="container">
                <div class="slide-up">
                    <h2 style="text-align: center; margin-bottom: 3rem;">Why This Matters</h2>
                    
                    <div class="grid grid-2" style="margin-bottom: 3rem;">
                        <div class="card">
                            <i class="fas fa-eye" style="font-size: 2rem; color: var(--blue-accent); margin-bottom: 1rem;"></i>
                            <h3>Gain Clarity</h3>
                            <ul class="features-list">
                                <li>See where your time and energy are really going</li>
                                <li>Identify blind spots that may be slowing you down</li>
                                <li>Discover how aligned your team and strategy truly are</li>
                            </ul>
                        </div>
                        
                        <div class="card">
                            <i class="fas fa-rocket" style="font-size: 2rem; color: var(--blue-accent); margin-bottom: 1rem;"></i>
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
        <section class="section section-gray">
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
        <section class="section section-navy">
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
                <p>&copy; 2024 Executive Growth Diagnostic. Created by Ryan Joswick, Executive Coach & Advisor.</p>
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
                    <a href="/" class="logo">Executive Growth Diagnostic</a>
                </div>
            </div>
        </header>

        <!-- Questionnaire Section -->
        <section class="section section-white">
            <div class="container">
                <div class="card" style="max-width: 800px; margin: 0 auto;">
                    <div id="questionnaire-app">
                        <!-- Progress Bar -->
                        <div class="progress-bar">
                            <div class="progress-fill" id="progress-fill" style="width: 4%;"></div>
                        </div>
                        
                        <div id="question-counter">
                            <p style="text-align: center; color: var(--gray-text); margin-bottom: 2rem;">
                                Question <span id="current-question">1</span> of <span id="total-questions">25</span>
                            </p>
                        </div>

                        <!-- Contact Information Step -->
                        <div id="step-0" class="question-step active">
                            <h2 style="margin-bottom: 2rem;">Let's Get Started</h2>
                            <p style="margin-bottom: 2rem; color: var(--gray-text);">
                                First, we need your contact information to send you the personalized report.
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
                                <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--blue-accent); margin-bottom: 2rem;"></i>
                                <h2 style="margin-bottom: 2rem;">Assessment Complete!</h2>
                                <p style="margin-bottom: 2rem; color: var(--gray-text);">
                                    Thank you for completing the Executive Growth Diagnostic. 
                                    Your personalized report is being generated and will be sent to your email shortly.
                                </p>
                                <button class="btn btn-gold" onclick="generateReport()" id="generate-report-btn">
                                    <i class="fas fa-file-pdf"></i> Generate My Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <script src="/static/questionnaire.js"></script>
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