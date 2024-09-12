
document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('MobileNumber') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLInputElement;
    const experienceElement = document.getElementById('experience') as HTMLInputElement;
    const skillsElement = document.getElementById('Skills') as HTMLInputElement;
    
    if (nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement) {
    const name = nameElement.value;
    const email = emailElement.value;
    const phone = phoneElement.value;
    const education = educationElement.value;
    const experience = experienceElement.value;
    const skills = skillsElement.value;
    
    const resumeOutput = `
    <h2> Generated Resume</h2>
    <p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
    <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
    <p><strong>Phone Number:</strong> <span id="edit-phone" class="editable">${phone}</span></p>
    <h3>Education</h3>
    <p id="edit-education" class="editable">${education}</p>
    <h3>Experience</h3>
    <p id="edit-experience" class="editable">${experience}</p>
    <h3>Skills</h3>
    <p id="edit-skills" class="editable">${skills}</p>
    `;
    
    const resumeOutputElement = document.getElementById('resumeOutput');
    document.getElementById('resumeOutput').style.display = "block"
    if (resumeOutputElement) {
    resumeOutputElement.innerHTML = resumeOutput;
    makeEditable();
    }
    } else {
    console.error('One or more output elements are missing');
    }
    });
    
    function makeEditable() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
    element.addEventListener('click', function() {
    const currentElement = element as HTMLElement;
    const currentValue = currentElement.textContent || "";
    
    if (currentElement.tagName === 'P' || currentElement.tagName === 'SPAN') {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentValue;
    input.classList.add('editing-input');
    
    input.addEventListener('blur', function() {
    currentElement.textContent = input.value;
    currentElement.style.display = 'inline';
    input.remove();
    });
    
    currentElement.style.display = 'none';
    currentElement.parentNode?.insertBefore(input, currentElement);
    input.focus();
    }
    });
    });
    }

    function pdfDownload() {
        const element = document.getElementById('resumeOutput');
        
        if (element.style.display !== "none") { 
          const opt = {
            margin: 1,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
          };
          html2pdf().from(element).set(opt).save();
        } else {
          alert("Please generate the resume first.");
        }
      }
      function generateSharableLink() {
        const element = document.getElementById('resumeOutput');
        
        if (element.style.display !== "none") { 
          const blob = new Blob([element.innerHTML], { type: 'text/html' });
          const sharableLink = URL.createObjectURL(blob);
      
          
          const linkOutput = document.createElement('input');
          linkOutput.type = 'text';
          linkOutput.value = sharableLink;
          linkOutput.readOnly = true;
          document.body.appendChild(linkOutput);
      
          linkOutput.select();
          document.execCommand('copy');
          alert("Sharable link has been copied to clipboard: " );
      
          // Clean up the input field after copy
          setTimeout(() => linkOutput.remove(), 5000);
        } else {
          alert("Please generate the resume first.");
        }
      }
      
      
      