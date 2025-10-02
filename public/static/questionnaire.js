// Executive Diagnostic Questionnaire JavaScript

// Question data structure
const questionCategories = [
    {
        category: "Leadership & Team Alignment",
        questions: [
            "How clearly does your team understand what success looks like in their roles?",
            "How often do you hold structured manager 1:1s or team cadences?", 
            "How aligned is your leadership team on the company's top priorities?",
            "How consistently are company decisions communicated and reinforced across the org?"
        ]
    },
    {
        category: "Time & Energy",
        questions: [
            "How much of your week is spent in meetings versus strategic work?",
            "How often do you protect time for long-term planning and big-picture thinking?",
            "How often do you feel you have energy left for high-value priorities at the end of the week?",
            "How often do you step away fully from work for family, friends, or personal recovery?"
        ]
    },
    {
        category: "Talent & Retention", 
        questions: [
            "How confident are you that your best performers will stay in the next 12 months?",
            "How effective is your onboarding at getting new hires productive quickly?",
            "How well does your current incentive plan reward the right outcomes versus the wrong behaviors?",
            "How consistently are you developing people for future leadership roles?"
        ]
    },
    {
        category: "EQ & Blind Spots",
        questions: [
            "How composed are you under stress or conflict in high-stakes situations?",
            "How often do you actively ask for feedback on your leadership or decisions?",
            "How aware are you of how your words and actions affect others?",
            "How effective are you at resolving conflict between team members or departments?"
        ]
    },
    {
        category: "Growth & Strategy",
        questions: [
            "How confident are you that your current sales process can scale over the next 12–18 months?",
            "What is the biggest obstacle in hitting revenue targets right now?",
            "How repeatable is your customer acquisition process today?",
            "How well does your team articulate your company's unique value in the sales process?"
        ]
    },
    {
        category: "Personal Fulfillment & Purpose",
        questions: [
            "How strongly do you feel a sense of purpose in your current role?",
            "How much do you feel you are playing to your strengths in your daily work?",
            "How confident are you in the long-term vision you're building toward?",
            "How fulfilled are you outside of work in areas like family, health, and personal growth?"
        ]
    }
];

// Answer options for most questions
const standardAnswers = [
    { value: 1, text: "Never" },
    { value: 2, text: "Rarely" },
    { value: 3, text: "Often" },
    { value: 4, text: "Always" }
];

// Special answer options for specific questions
const specialAnswers = {
    "How much of your week is spent in meetings versus strategic work?": [
        { value: 1, text: "80%+ meetings, very little strategic work" },
        { value: 2, text: "60-80% meetings, some strategic work" },
        { value: 3, text: "40-60% meetings, balanced approach" },
        { value: 4, text: "Less than 40% meetings, mostly strategic work" }
    ],
    "What is the biggest obstacle in hitting revenue targets right now?": [
        { value: 1, text: "Major systemic issues (process, team, market)" },
        { value: 2, text: "Multiple significant challenges" },
        { value: 3, text: "A few key challenges we're addressing" },
        { value: 4, text: "Minor obstacles, mostly on track" }
    ]
};

// Global state
let currentStep = 0;
let totalSteps = 0;
let responses = {};
let allQuestions = [];

// Initialize questionnaire
document.addEventListener('DOMContentLoaded', function() {
    initializeQuestionnaire();
    setupEventListeners();
});

function initializeQuestionnaire() {
    // Generate all questions
    let questionIndex = 2; // Start after contact info (step 0) and role (step 1)
    
    questionCategories.forEach(category => {
        category.questions.forEach(question => {
            allQuestions.push({
                id: questionIndex,
                category: category.category,
                question: question,
                answers: specialAnswers[question] || standardAnswers
            });
            questionIndex++;
        });
    });
    
    totalSteps = questionIndex + 1; // +1 for results step
    document.getElementById('total-questions').textContent = totalSteps - 1;
    
    // Generate question HTML
    generateQuestionSteps();
    updateProgress();
}

function generateQuestionSteps() {
    const container = document.getElementById('dynamic-questions');
    
    allQuestions.forEach(q => {
        const stepHTML = `
            <div id="step-${q.id}" class="question-step">
                <div style="margin-bottom: 1rem;">
                    <span style="color: var(--blue-accent); font-weight: 600; font-size: 0.9rem; text-transform: uppercase;">
                        ${q.category}
                    </span>
                </div>
                <h2 style="margin-bottom: 2rem;">${q.question}</h2>
                
                <div class="radio-group">
                    ${q.answers.map(answer => `
                        <label class="radio-option">
                            <input type="radio" name="question-${q.id}" value="${answer.value}">
                            <span>${answer.text}</span>
                        </label>
                    `).join('')}
                </div>
                
                <div style="display: flex; justify-content: space-between; margin-top: 2rem;">
                    <button class="btn btn-secondary" onclick="previousStep()">
                        <i class="fas fa-arrow-left"></i> Back
                    </button>
                    <button class="btn btn-primary" onclick="nextStep()" disabled id="next-btn-${q.id}">
                        <i class="fas fa-arrow-right"></i> ${q.id === allQuestions[allQuestions.length - 1].id ? 'Finish Assessment' : 'Continue'}
                    </button>
                </div>
            </div>
        `;
        container.innerHTML += stepHTML;
    });
}

function setupEventListeners() {
    // Contact form validation
    document.getElementById('name').addEventListener('input', validateContactInfo);
    document.getElementById('email').addEventListener('input', validateContactInfo);
    
    // Role selection
    document.querySelectorAll('input[name="role"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.getElementById('next-btn-1').disabled = false;
            responses.role = this.value;
        });
    });
    
    // Question responses
    allQuestions.forEach(q => {
        document.querySelectorAll(`input[name="question-${q.id}"]`).forEach(radio => {
            radio.addEventListener('change', function() {
                document.getElementById(`next-btn-${q.id}`).disabled = false;
                responses[`question-${q.id}`] = {
                    category: q.category,
                    question: q.question,
                    value: parseInt(this.value)
                };
                
                // Update selected style
                document.querySelectorAll(`input[name="question-${q.id}"]`).forEach(r => {
                    r.parentElement.classList.remove('selected');
                });
                this.parentElement.classList.add('selected');
            });
        });
    });
}

function validateContactInfo() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const isValid = name.length > 0 && emailRegex.test(email);
    
    if (isValid) {
        responses.name = name;
        responses.email = email;
    }
    
    return isValid;
}

function nextStep() {
    // Validate current step
    if (currentStep === 0) {
        if (!validateContactInfo()) {
            alert('Please fill in all required fields with valid information.');
            return;
        }
    }
    
    // Hide current step
    const currentStepEl = document.querySelector('.question-step.active');
    if (currentStepEl) {
        currentStepEl.classList.remove('active');
    }
    
    currentStep++;
    
    // Show next step
    let nextStepId;
    if (currentStep <= allQuestions.length + 1) {
        nextStepId = `step-${currentStep}`;
    } else {
        nextStepId = 'step-results';
    }
    
    const nextStepEl = document.getElementById(nextStepId);
    if (nextStepEl) {
        nextStepEl.classList.add('active');
        nextStepEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    updateProgress();
}

function previousStep() {
    // Hide current step
    const currentStepEl = document.querySelector('.question-step.active');
    if (currentStepEl) {
        currentStepEl.classList.remove('active');
    }
    
    currentStep--;
    
    // Show previous step
    const prevStepEl = document.getElementById(`step-${currentStep}`);
    if (prevStepEl) {
        prevStepEl.classList.add('active');
        prevStepEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    updateProgress();
}

function updateProgress() {
    const progress = Math.min(((currentStep + 1) / totalSteps) * 100, 100);
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('current-question').textContent = currentStep + 1;
    
    // Update question counter visibility
    const questionCounter = document.getElementById('question-counter');
    if (currentStep >= totalSteps - 1) {
        questionCounter.style.display = 'none';
    } else {
        questionCounter.style.display = 'block';
    }
}

async function generateReport() {
    const generateBtn = document.getElementById('generate-report-btn');
    generateBtn.disabled = true;
    generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating Report...';
    
    try {
        // Calculate scores by category
        const scores = calculateScores();
        
        // Prepare submission data
        const submissionData = {
            ...responses,
            scores: scores,
            timestamp: new Date().toISOString()
        };
        
        // Submit to API
        const response = await fetch('/api/submit-questionnaire', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submissionData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Update UI to show success
            generateBtn.innerHTML = '<i class="fas fa-check-circle"></i> Report Generated!';
            generateBtn.classList.remove('btn-gold');
            generateBtn.classList.add('btn-primary');
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.innerHTML = `
                <div style="margin-top: 2rem; padding: 1.5rem; background-color: var(--gray-light); border-radius: 8px; border-left: 4px solid var(--blue-accent);">
                    <h4 style="margin-bottom: 0.5rem; color: var(--navy-primary);">
                        <i class="fas fa-envelope"></i> Report Sent Successfully!
                    </h4>
                    <p style="margin-bottom: 1rem; color: var(--gray-text);">
                        Your personalized Executive Growth Diagnostic report has been sent to <strong>${responses.email}</strong>
                    </p>
                    <p style="margin-bottom: 0; color: var(--gray-text); font-size: 0.9rem;">
                        Report ID: ${result.reportId}
                    </p>
                </div>
            `;
            generateBtn.parentNode.appendChild(successMsg);
        } else {
            throw new Error(result.message || 'Failed to generate report');
        }
    } catch (error) {
        console.error('Error generating report:', error);
        generateBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error - Please Try Again';
        generateBtn.disabled = false;
        generateBtn.classList.add('btn-secondary');
        
        alert('There was an error generating your report. Please try again or contact support.');
    }
}

function calculateScores() {
    const scores = {};
    
    questionCategories.forEach(category => {
        const categoryQuestions = allQuestions.filter(q => q.category === category.category);
        let totalScore = 0;
        let questionCount = 0;
        
        categoryQuestions.forEach(q => {
            const response = responses[`question-${q.id}`];
            if (response) {
                totalScore += response.value;
                questionCount++;
            }
        });
        
        const avgScore = questionCount > 0 ? (totalScore / questionCount) : 0;
        const percentage = Math.round((avgScore / 4) * 100);
        
        let level = 'Low';
        if (percentage >= 75) level = 'High';
        else if (percentage >= 50) level = 'Medium';
        
        scores[category.category] = {
            score: avgScore.toFixed(1),
            percentage: percentage,
            level: level,
            questionCount: questionCount
        };
    });
    
    return scores;
}

// Add CSS class for active question step
const style = document.createElement('style');
style.textContent = `
    .question-step {
        display: none;
    }
    .question-step.active {
        display: block;
        animation: fadeIn 0.3s ease-in;
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);