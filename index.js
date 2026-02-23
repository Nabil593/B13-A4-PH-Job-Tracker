let interviewData = [];
let rejectedData = [];

// All switch toggle buttons
let total = document.getElementById('total');
let interview = document.getElementById('interview');
let rejected = document.getElementById('rejected');

const allBtn = document.getElementById('all-btn');
const interviewBtn = document.getElementById('interview-btn');
const rejectedBtn = document.getElementById('rejected-btn');


const mainContainer = document.querySelector('main');

const JobDetails = document.getElementById('job-details');
const totalJobs = JobDetails.children.length;

// Dashboard Count
function switchButtons() {
    total.innerText = totalJobs;
    interview.innerText = interviewData.length;
    rejected.innerText = rejectedData.length;
}
switchButtons();


// Switcg Toggle function:
function toggleStyle(id) {
    allBtn.classList.remove('bg-[#3B82F6]', 'text-white');
    interviewBtn.classList.remove('bg-[#3B82F6]', 'text-white');
    rejectedBtn.classList.remove('bg-[#3B82F6]', 'text-white');

    allBtn.classList.add('bg-white', 'text-black');
    interviewBtn.classList.add('bg-white', 'text-black');
    rejectedBtn.classList.add('bg-white', 'text-black');

    const selected = document.getElementById(id);

    selected.classList.remove('bg-white', 'text-black');
    selected.classList.add('bg-[#3B82F6]', 'text-white');
}

//Main container Click function
mainContainer.addEventListener('click', function(e) {
    const mainParentNode = e.target.parentNode;
    const jobName = mainParentNode.querySelector('.job-name').innerText;
    const jobTitle = mainParentNode.querySelector('.job-title').innerText;
    const salary = mainParentNode.querySelector('.salary').innerText;
    const jobStatus = mainParentNode.querySelector('.status').innerText;
    const jobDiscription = mainParentNode.querySelector('.discription').innerText;
    
    const jobInfo = {
        jobName,
        jobTitle,
        salary,
        jobStatus,
        jobDiscription
    };
    
    const jobExist = interviewData.find(item => item.jobName == jobInfo.jobName);
    if (!jobExist) {
        interviewData.push(jobInfo);
    }
})