// PDF Report Generator for Executive Growth Diagnostic
// Navy & Gold Design Theme

async function generateAndDownloadReport() {
    const generateBtn = document.getElementById('generate-report-btn');
    generateBtn.disabled = true;
    generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    
    try {
        // Get assessment data
        console.log('Step 1: Getting assessment data...');
        const data = getAssessmentData();
        console.log('Assessment data retrieved:', data);
        
        // Check if jsPDF is available
        if (!window.jspdf) {
            throw new Error('jsPDF library not loaded');
        }
        
        // Create PDF using jsPDF
        console.log('Step 2: Creating PDF document...');
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'letter'
        });
        
        console.log('Step 3: PDF document created');
        
        // Navy and gold colors
        const navy = [10, 22, 40];
        const navyMedium = [30, 41, 59];
        const gold = [245, 158, 11];
        const white = [255, 255, 255];
        const grayText = [100, 116, 139];
        const blue = [37, 99, 235];
        
        // Page dimensions
        const pageWidth = 215.9;
        const pageHeight = 279.4;
        const margin = 20;
        
        console.log('Step 4: Starting page generation...');
        
        // ============ PAGE 1: COVER ============
        try {
            console.log('Step 5: Generating cover page...');
            generateCoverPage(doc, data, navy, gold, white, grayText, pageWidth, pageHeight, margin);
            console.log('Cover page complete');
        } catch (err) {
            console.error('Error in cover page:', err);
            throw err;
        }
        
        // ============ PAGE 2: RESULTS ============
        try {
            console.log('Step 6: Generating results page...');
            doc.addPage();
            generateResultsPage(doc, data, navy, navyMedium, gold, blue, white, grayText, pageWidth, pageHeight, margin);
            console.log('Results page complete');
        } catch (err) {
            console.error('Error in results page:', err);
            throw err;
        }
        
        // ============ PAGE 3: ACTION STEPS ============
        try {
            console.log('Step 7: Generating action steps page...');
            doc.addPage();
            generateActionStepsPage(doc, data, navy, navyMedium, gold, blue, white, grayText, pageWidth, pageHeight, margin);
            console.log('Action steps page complete');
        } catch (err) {
            console.error('Error in action steps page:', err);
            throw err;
        }
        
        // ============ PAGE 4: NEXT STEPS WITH RYAN ============
        try {
            console.log('Step 8: Generating next steps page...');
            doc.addPage();
            generateNextStepsPage(doc, data, navy, navyMedium, gold, white, grayText, pageWidth, pageHeight, margin);
            console.log('Next steps page complete');
        } catch (err) {
            console.error('Error in next steps page:', err);
            throw err;
        }
        
        // Save PDF
        console.log('Step 9: Saving PDF to device...');
        const filename = `Executive-Diagnostic-Report-${data.name.replace(/\s+/g, '-')}.pdf`;
        
        // Use save method which triggers browser download
        doc.save(filename);
        
        console.log('Step 10: PDF download triggered successfully!');
        
        // Update UI
        generateBtn.innerHTML = '<i class="fas fa-check-circle"></i> Report Downloaded!';
        generateBtn.classList.remove('btn-gold');
        generateBtn.classList.add('btn-primary');
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.innerHTML = `
            <h4>
                <i class="fas fa-check-circle"></i> Report Downloaded Successfully!
            </h4>
            <p style="margin-bottom: 1rem;">
                Your personalized Executive Growth Diagnostic report has been downloaded to your device.
            </p>
            <p style="margin-bottom: 0; font-weight: 600;">
                Ready to take the next step? Book your complimentary 15-minute session with Ryan.
            </p>
        `;
        generateBtn.parentNode.appendChild(successMsg);
        
    } catch (error) {
        console.error('❌ PDF Generation Error:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        
        generateBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error - Please Try Again';
        generateBtn.disabled = false;
        
        // Show detailed error to user
        alert(`Error generating PDF: ${error.message}\n\nPlease check the browser console (F12) for more details.`);
    }
}

function generateCoverPage(doc, data, navy, gold, white, grayText, pageWidth, pageHeight, margin) {
    console.log('Cover page: Drawing background...');
    
    // Navy background
    doc.setFillColor(...navy);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    
    // Gold accent bar at top
    doc.setFillColor(...gold);
    doc.rect(0, 0, pageWidth, 8, 'F');
    
    console.log('Cover page: Drawing content area...');
    
    // White content area
    const contentY = 60;
    const contentHeight = 160;
    doc.setFillColor(...white);
    doc.roundedRect(margin, contentY, pageWidth - 2 * margin, contentHeight, 5, 5, 'F');
    
    console.log('Cover page: Adding text...');
    
    // Title
    doc.setTextColor(...navy);
    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    doc.text('Executive Growth', pageWidth / 2, contentY + 30, { align: 'center' });
    
    doc.setFontSize(28);
    doc.text('Diagnostic Results', pageWidth / 2, contentY + 45, { align: 'center' });
    
    // Gold divider line
    doc.setFillColor(...gold);
    doc.rect(margin + 40, contentY + 55, pageWidth - 2 * margin - 80, 2, 'F');
    
    // Prepared for
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Prepared for:', pageWidth / 2, contentY + 75, { align: 'center' });
    
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text(data.name, pageWidth / 2, contentY + 90, { align: 'center' });
    
    // Role
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...grayText);
    doc.text(data.role, pageWidth / 2, contentY + 100, { align: 'center' });
    
    // Subheader
    doc.setFontSize(14);
    doc.setTextColor(...navy);
    doc.text('A snapshot of where you stand today', pageWidth / 2, contentY + 120, { align: 'center' });
    
    // Date
    doc.setFontSize(11);
    doc.setTextColor(...grayText);
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    doc.text(date, pageWidth / 2, contentY + 135, { align: 'center' });
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(...white);
    doc.text('Ryan Joswick', pageWidth / 2, pageHeight - 20, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.text('Executive Coach & Advisor', pageWidth / 2, pageHeight - 13, { align: 'center' });
    
    console.log('Cover page: Complete');
}

function generateResultsPage(doc, data, navy, navyMedium, gold, blue, white, grayText, pageWidth, pageHeight, margin) {
    console.log('Results page: Starting...');
    
    // Header
    doc.setFillColor(...navy);
    doc.rect(0, 0, pageWidth, 25, 'F');
    
    doc.setTextColor(...white);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Your Results', margin, 17);
    
    // Gold accent line
    doc.setFillColor(...gold);
    doc.rect(0, 25, pageWidth, 2, 'F');
    
    const scores = data.scores;
    const categories = Object.keys(scores);
    
    console.log('Results page: Processing categories...');
    
    // Calculate layout
    const categoriesPerColumn = 3;
    const columnWidth = (pageWidth - 3 * margin) / 2;
    
    categories.forEach((category, index) => {
        const score = scores[category];
        const col = Math.floor(index / categoriesPerColumn);
        const row = index % categoriesPerColumn;
        
        const x = margin + (col * (columnWidth + margin));
        const y = 45 + (row * 70);
        
        // Category box
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(x, y, columnWidth, 60, 3, 3, 'F');
        
        // Category name
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...navy);
        const categoryLines = doc.splitTextToSize(category, columnWidth - 10);
        doc.text(categoryLines, x + 5, y + 8);
        
        // Score bar
        const barY = y + (categoryLines.length * 5) + 10;
        const barWidth = columnWidth - 10;
        const fillWidth = (score.percentage / 100) * barWidth;
        
        // Background bar
        doc.setFillColor(226, 232, 240);
        doc.roundedRect(x + 5, barY, barWidth, 6, 2, 2, 'F');
        
        // Fill bar with color based on level
        if (score.level === 'High') {
            doc.setFillColor(...blue);
        } else if (score.level === 'Medium') {
            doc.setFillColor(...gold);
        } else {
            doc.setFillColor(239, 68, 68); // Red for low
        }
        doc.roundedRect(x + 5, barY, fillWidth, 6, 2, 2, 'F');
        
        // Score text - improved spacing and readability
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...navy);
        doc.text(`${score.percentage}%`, x + 5, barY + 18);
        
        // Level text on separate line with proper spacing
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...grayText);
        doc.text(score.level, x + 5, barY + 26);
        
        // Brief insight with better spacing
        doc.setFontSize(8);
        doc.setTextColor(...navyMedium);
        const insight = getInsight(category, score.level);
        const insightLines = doc.splitTextToSize(insight, columnWidth - 10);
        doc.text(insightLines, x + 5, barY + 35);
    });
    
    // Footer
    addFooter(doc, navy, grayText, pageWidth, pageHeight, 2);
    
    console.log('Results page: Complete');
}

function generateActionStepsPage(doc, data, navy, navyMedium, gold, blue, white, grayText, pageWidth, pageHeight, margin) {
    console.log('Action steps page: Starting...');
    
    // Header
    doc.setFillColor(...navy);
    doc.rect(0, 0, pageWidth, 25, 'F');
    
    doc.setTextColor(...white);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Your Next Moves', margin, 17);
    
    // Gold accent line
    doc.setFillColor(...gold);
    doc.rect(0, 25, pageWidth, 2, 'F');
    
    // Intro text
    let yPos = 45;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...navyMedium);
    const intro = 'Based on your assessment, here are practical steps to address your key growth areas:';
    doc.text(intro, margin, yPos);
    
    yPos += 15;
    
    // Get action steps based on lowest scores
    const actions = generateActionSteps(data.scores);
    
    actions.forEach((action, index) => {
        // Number circle
        doc.setFillColor(...blue);
        doc.circle(margin + 5, yPos + 3, 5, 'F');
        doc.setTextColor(...white);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`${index + 1}`, margin + 5, yPos + 5, { align: 'center' });
        
        // Action title with better spacing
        doc.setTextColor(...navy);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(action.title, margin + 15, yPos + 5);
        
        yPos += 10; // Increased spacing between title and description
        
        // Action description with proper line height
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(...navyMedium);
        const actionLines = doc.splitTextToSize(action.description, pageWidth - 2 * margin - 15);
        doc.text(actionLines, margin + 15, yPos);
        
        yPos += (actionLines.length * 5.5) + 15; // Improved spacing calculation
        
        // Separator line with more space
        if (index < actions.length - 1) {
            doc.setDrawColor(226, 232, 240);
            doc.setLineWidth(0.5);
            doc.line(margin, yPos - 8, pageWidth - margin, yPos - 8);
        }
    });
    
    // Footer
    addFooter(doc, navy, grayText, pageWidth, pageHeight, 3);
    
    console.log('Action steps page: Complete');
}

function generateNextStepsPage(doc, data, navy, navyMedium, gold, white, grayText, pageWidth, pageHeight, margin) {
    console.log('Next steps page: Starting...');
    
    // Navy background for top section - taller for better balance
    doc.setFillColor(...navy);
    doc.rect(0, 0, pageWidth, 85, 'F');
    
    // Gold accent bar
    doc.setFillColor(...gold);
    doc.rect(0, 0, pageWidth, 5, 'F');
    
    // Title
    doc.setTextColor(...white);
    doc.setFontSize(26);
    doc.setFont('helvetica', 'bold');
    doc.text('Next Step with Ryan', pageWidth / 2, 28, { align: 'center' });
    
    // Congratulations text - better spacing
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('You now have clarity on your strengths and blind spots,', pageWidth / 2, 44, { align: 'center' });
    doc.text('plus practical steps to get moving.', pageWidth / 2, 53, { align: 'center' });
    
    // Emphasis text
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('This is only the starting point.', pageWidth / 2, 66, { align: 'center' });
    
    // Main content area - start below navy header
    let yPos = 100;
    
    // Define blue color for button
    const blue = [37, 99, 235];
    
    // Clean intro text
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...navyMedium);
    doc.text('Because you completed this diagnostic, you have exclusive access', pageWidth / 2, yPos, { align: 'center' });
    yPos += 10;
    doc.text('to a complimentary 15-minute coaching call with Ryan.', pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 20;
    
    // LARGE CENTERED BUTTON - Main CTA (only button on page)
    const buttonWidth = 130;
    const buttonHeight = 22;
    const buttonX = (pageWidth - buttonWidth) / 2;
    const buttonY = yPos;
    
    // Button background - bright blue
    doc.setFillColor(...blue);
    doc.roundedRect(buttonX, buttonY, buttonWidth, buttonHeight, 4, 4, 'F');
    
    // Button text - large and bold
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...white);
    doc.text('CLICK HERE TO BOOK YOUR SESSION', pageWidth / 2, buttonY + 14, { align: 'center' });
    
    // Add clickable link to the button area
    doc.link(buttonX, buttonY, buttonWidth, buttonHeight, { url: 'https://calendly.com/ryan-eclm' });
    
    // Helper text below button
    yPos = buttonY + buttonHeight + 6;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(128, 128, 128); // Gray
    doc.text('(This button is clickable)', pageWidth / 2, yPos, { align: 'center' });
    
    // Add spacing before benefits
    yPos += 22;
    
    // Benefits section with clean layout
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...navy);
    doc.text('What You\'ll Get in Your Session:', margin, yPos);
    
    yPos += 12;
    
    const benefits = [
        'Personalized review of your diagnostic results',
        'Specific guidance on your top 2-3 priority areas',
        'Clear next steps tailored to your situation',
        'Direct insight from an executive coach who\'s been there'
    ];
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...navyMedium);
    
    benefits.forEach(benefit => {
        // Checkmark
        doc.setTextColor(...blue);
        doc.setFont('helvetica', 'bold');
        doc.text('✓', margin, yPos);
        
        doc.setTextColor(...navyMedium);
        doc.setFont('helvetica', 'normal');
        doc.text(benefit, margin + 8, yPos);
        yPos += 10;
    });
    
    // Footer
    addFooter(doc, navy, grayText, pageWidth, pageHeight, 4);
    
    console.log('Next steps page: Complete');
}

function addFooter(doc, navy, grayText, pageWidth, pageHeight, pageNum) {
    doc.setFontSize(9);
    doc.setTextColor(...grayText);
    doc.setFont('helvetica', 'normal');
    doc.text('Ryan Joswick | Executive Coach & Advisor', pageWidth / 2, pageHeight - 12, { align: 'center' });
    doc.text(`Page ${pageNum} of 4`, pageWidth / 2, pageHeight - 7, { align: 'center' });
}

function getInsight(category, level) {
    const insights = {
        'Leadership & Team Alignment': {
            'High': 'Strong alignment and clear communication',
            'Medium': 'Good foundation, room for improvement',
            'Low': 'Focus on clarity and consistency'
        },
        'Time & Energy': {
            'High': 'Well-balanced and strategic',
            'Medium': 'Some optimization needed',
            'Low': 'Priority: protect strategic time'
        },
        'Talent & Retention': {
            'High': 'Strong talent practices in place',
            'Medium': 'Good systems, need refinement',
            'Low': 'Critical: address retention risks'
        },
        'EQ & Blind Spots': {
            'High': 'High self-awareness and composure',
            'Medium': 'Developing awareness',
            'Low': 'Opportunity: seek more feedback'
        },
        'Growth & Strategy': {
            'High': 'Scalable processes established',
            'Medium': 'Solid base, needs scaling prep',
            'Low': 'Focus: repeatable systems'
        },
        'Personal Fulfillment & Purpose': {
            'High': 'Aligned and fulfilled',
            'Medium': 'Good balance, minor gaps',
            'Low': 'Priority: reconnect with purpose'
        }
    };
    
    return insights[category]?.[level] || 'Area for development';
}

function generateActionSteps(scores) {
    // Sort categories by score to find lowest areas
    const sortedCategories = Object.entries(scores)
        .sort((a, b) => a[1].percentage - b[1].percentage)
        .slice(0, 5);
    
    const actionMap = {
        'Leadership & Team Alignment': {
            title: 'Strengthen Team Alignment',
            description: 'Hold a weekly 30-minute alignment call with your direct reports. Use this time to clarify priorities, remove blockers, and ensure everyone is rowing in the same direction. Document decisions and circulate notes within 24 hours.'
        },
        'Time & Energy': {
            title: 'Protect Strategic Time',
            description: 'Block 2 hours each week for strategic work and treat it as sacred. Turn off notifications, close email, and focus on high-value priorities like planning, big decisions, or relationship building. Schedule it when your energy is highest.'
        },
        'Talent & Retention': {
            title: 'Invest in Onboarding & Development',
            description: 'Review your onboarding process to ensure new hires can ramp in less than 90 days. Create a clear 30-60-90 day plan with milestones. Also, identify 2-3 high performers and start having monthly development conversations with them.'
        },
        'EQ & Blind Spots': {
            title: 'Seek Feedback Actively',
            description: 'Ask one direct report this week: "What clarity do you need from me to perform better?" Listen without defensiveness. Make this a monthly practice. Consider a 360 review to identify blind spots you cannot see on your own.'
        },
        'Growth & Strategy': {
            title: 'Build Repeatable Systems',
            description: 'Document your top 3 sales or customer acquisition processes. Identify what works, what does not, and where inconsistency creeps in. Create playbooks or checklists so success becomes repeatable, not reliant on individual heroics.'
        },
        'Personal Fulfillment & Purpose': {
            title: 'Reconnect with Your "Why"',
            description: 'Schedule 30 minutes this week to reflect on what truly drives you. Write down your long-term vision for yourself, your team, and your impact. Use this as a filter for how you spend your time and energy going forward.'
        }
    };
    
    const actions = [];
    sortedCategories.forEach(([category, score]) => {
        if (actionMap[category]) {
            actions.push(actionMap[category]);
        }
    });
    
    return actions.slice(0, 5);
}
