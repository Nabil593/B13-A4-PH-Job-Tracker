let interviewData = [];
let rejectedData = [];

// All switch toggle buttons
let total = document.getElementById('total');
let interview = document.getElementById('interview');
let rejected = document.getElementById('rejected');

const JobDetails = document.getElementById('job-details');
const totalJobs = JobDetails.children.length;

function switchButtons() {
    total.innerText = totalJobs;
    interview.innerText = interviewData.length;
    rejected.innerText = rejectedData.length;
}
switchButtons();

