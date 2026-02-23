let interviewData = [];
let rejectedData = [];
let currentStatus = 'all-btn';

// All switch toggle buttons
let total = document.getElementById('total');
let interview = document.getElementById('interview');
let rejected = document.getElementById('rejected');
const allBtn = document.getElementById('all-btn');
const interviewBtn = document.getElementById('interview-btn');
const rejectedBtn = document.getElementById('rejected-btn');
const noJobsSection = document.getElementById('empty-section');
const counter = document.getElementById('counter');
const delet = document.getElementById('delet');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filtered-section');
const JobDetails = document.getElementById('job-details');
const totalJobs = JobDetails.children.length;


function sideCounter() {
    // const currentTotal = JobDetails.children.length;
    if(currentStatus === 'all-btn') {
        counter.innerText = `${totalJobs} Jobs`;
        if (totalJobs === 0) {
            noJobsSection.classList.remove('hidden');
        } else {
            noJobsSection.classList.add('hidden');
        }
    } else if (currentStatus === 'interview-btn') {
        counter.innerText = `${interviewData.length} of ${totalJobs} Jobs`;
    } else if (currentStatus === 'rejected-btn') {
        counter.innerText = `${rejectedData.length} of ${totalJobs} Jobs`;
    }
};

// Dashboard Count
function switchButtons() {
    total.innerText = totalJobs;
    interview.innerText = interviewData.length;
    rejected.innerText = rejectedData.length;
    counter.innerText = `${totalJobs} Jobs`;
    sideCounter();
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
    currentStatus = id;

    selected.classList.remove('bg-white', 'text-black');
    selected.classList.add('bg-[#3B82F6]', 'text-white');

    if (id === 'interview-btn'){
        JobDetails.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    } else if (id === 'all-btn') {
        JobDetails.classList.remove('hidden');
        filterSection.classList.add('hidden');
        sideCounter();
    } else if (id === 'rejected-btn') {
        JobDetails.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejected();
    }
}

//Main container Click function
mainContainer.addEventListener('click', function(e) {

    if(e.target.classList.contains('interv-btn')) {

    const mainParentNode = e.target.parentNode;
    const jobName = mainParentNode.querySelector('.job-name').innerText;
    const jobTitle = mainParentNode.querySelector('.job-title').innerText;
    const salary = mainParentNode.querySelector('.salary').innerText;
    const jobDiscription = mainParentNode.querySelector('.discription').innerText;
    
    let jobStatus = mainParentNode.querySelector('.status');
    jobStatus.innerText = 'INTERVIEW';
    jobStatus.className = 'w-30 text-center py-1.5 px-3 rounded-md bg-green-200 text-[14px] font-medium border-1 border-[#10B981] text-[#027a24]';

    const jobInfo = {
        jobName,
        jobTitle,
        salary,
        jobStatus : 'INTERVIEW',
        jobDiscription
    };

    
    const jobExist = interviewData.find(item => item.jobName == jobInfo.jobName);
    if (!jobExist) {
        interviewData.push(jobInfo);
        renderInterview();
    }
    
    rejectedData = rejectedData.filter(item => item.jobName !== jobInfo.jobName);
    switchButtons();
    
    if (currentStatus == 'rejected-btn') {
        renderRejected();
    }


} else if(e.target.classList.contains('reject-btn')) {

    const mainParentNode = e.target.parentNode;
    const jobName = mainParentNode.querySelector('.job-name').innerText;
    const jobTitle = mainParentNode.querySelector('.job-title').innerText;
    const salary = mainParentNode.querySelector('.salary').innerText;
    const jobDiscription = mainParentNode.querySelector('.discription').innerText;
    
    let jobStatus = mainParentNode.querySelector('.status');
    jobStatus.innerText = 'REJECTED';
    jobStatus.className = 'w-30 text-center py-1.5 px-3 rounded-md bg-red-200 text-[14px] font-medium border-1 border-red-700 text-red-600';

    const jobInfo = {
        jobName,
        jobTitle,
        salary,
        jobStatus : 'REJECTED',
        jobDiscription
    };

    
    const jobExist = rejectedData.find(item => item.jobName == jobInfo.jobName);
    if (!jobExist) {
        rejectedData.push(jobInfo);
        renderRejected();
    }
    
    interviewData = interviewData.filter(item => item.jobName !== jobInfo.jobName);
    switchButtons();
    
    if (currentStatus == 'interview-btn') {
        renderInterview();
    }
}
});



// Render Interview Data
function renderInterview() {
    filterSection.innerHTML = '';

    if (interviewData.length === 0) {
        noJobsSection.classList.remove('hidden');
    } else {
        noJobsSection.classList.add('hidden');
    };

    for(let inter of interviewData) {
        console.log(inter);
        let div = document.createElement('div');
        div.className = 'bg-white p-6 rounded-lg flex justify-between';
        div.innerHTML = `
        <div>
                <h3 class="job-name text-[#002C5C] text-[20px] font-semibold">${inter.jobName}</h3>
                <p class="job-title text-[#64748B] text-[16px]">${inter.jobTitle}</p>
                <p class="salary text-[#64748B] text-[14px] my-[20px]">${inter.salary}</p>
                <p class="status w-30 text-center py-1.5 px-3 rounded-md bg-green-200 text-[14px] font-medium border-1 border-[#10B981] text-[#027a24]">${inter.jobStatus}</p>
                <p class="discription text-[#323B49] text-[14px] mt-2 mb-5">${inter.jobDiscription}</p>
                <button
                    class="interv-btn py-1.5 px-3 border-1 rounded-md border-[#10B981] text-[#10B981] text-[14px] font-semibold cursor-pointer">INTERVIEW</button>
                <button
                    class="reject-btn py-1.5 px-3 border-1 rounded-md border-[#EF4444] text-[#EF4444] text-[14px] font-semibold cursor-pointer">REJECTED</button>
            </div>
            <div
                class="w-9 h-9 border-1 p-2 border-[#c7c7c7] flex items-center justify-center rounded-full text-gray-500 cursor-pointer">
                <i class="fa-regular fa-trash-can"></i>
            </div>
        `
        filterSection.appendChild(div);
    }
    sideCounter();
}



// Render Rejected Data
function renderRejected() {
    filterSection.innerHTML = '';

    if (rejectedData.length === 0) {
        noJobsSection.classList.remove('hidden');
    } else {
        noJobsSection.classList.add('hidden');
    };

    for(let inter of rejectedData) {
        console.log(inter);
        let div = document.createElement('div');
        div.className = 'bg-white p-6 rounded-lg flex justify-between';
        div.innerHTML = `
        <div>
                <h3 class="job-name text-[#002C5C] text-[20px] font-semibold">${inter.jobName}</h3>
                <p class="job-title text-[#64748B] text-[16px]">${inter.jobTitle}</p>
                <p class="salary text-[#64748B] text-[14px] my-[20px]">${inter.salary}</p>
                <p class="status w-30 text-center py-1.5 px-3 rounded-md text-[14px] font-medium bg-red-200 border border-red-700 text-red-600">${inter.jobStatus}</p>
                <p class="discription text-[#323B49] text-[14px] mt-2 mb-5">${inter.jobDiscription}</p>
                <button
                    class="interv-btn py-1.5 px-3 border-1 rounded-md border-[#10B981] text-[#10B981] text-[14px] font-semibold cursor-pointer">INTERVIEW</button>
                <button
                    class="reject-btn py-1.5 px-3 border-1 rounded-md border-[#EF4444] text-[#EF4444] text-[14px] font-semibold cursor-pointer">REJECTED</button>
            </div>
            <div
                class="w-9 h-9 border-1 p-2 border-[#c7c7c7] flex items-center justify-center rounded-full text-gray-500 cursor-pointer">
                <i class="fa-regular fa-trash-can"></i>
            </div>
        `
        filterSection.appendChild(div);
    };
    sideCounter();
}