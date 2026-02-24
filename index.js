const totalCountEl = document.getElementById("total");
const interviewCountEl = document.getElementById("interview");
const rejectedCountEl = document.getElementById("rejected");

const allBtn = document.getElementById("all-btn");
const interviewBtn = document.getElementById("interview-btn");
const rejectedBtn = document.getElementById("rejected-btn");

const noJobsSection = document.getElementById("empty-section");
const counterText = document.getElementById("counter");
const mainContainer = document.querySelector("main");
const filterSection = document.getElementById("filtered-section");
const jobDetailsContainer = document.getElementById("job-details");

let interviewData = [];
let rejectedData = [];
let currentStatus = "all-btn";

// Dasboard & Counter Update function
function updateDashboard() {
  const totalJobs = jobDetailsContainer.children.length;

  totalCountEl.innerText = totalJobs;
  interviewCountEl.innerText = interviewData.length;
  rejectedCountEl.innerText = rejectedData.length;

  if (currentStatus === "all-btn") {
    counterText.innerText = `${totalJobs} Jobs`;
    if (totalJobs > 0) {
      noJobsSection.classList.add("hidden");
    } else {
      noJobsSection.classList.remove("hidden");
    }
  } else if (currentStatus === "interview-btn") {
    counterText.innerText = `${interviewData.length} of ${totalJobs} Jobs`;
    if (interviewData.length > 0) {
      noJobsSection.classList.add("hidden");
    } else {
      noJobsSection.classList.remove("hidden");
    }
  } else if (currentStatus === "rejected-btn") {
    counterText.innerText = `${rejectedData.length} of ${totalJobs} Jobs`;
    if (rejectedData.length > 0) {
      noJobsSection.classList.add("hidden");
    } else {
      noJobsSection.classList.remove("hidden");
    }
  }
};
updateDashboard();

// Filter toggle style
function toggleStyle(id) {
  currentStatus = id;

  const buttons = [allBtn, interviewBtn, rejectedBtn];

  for (const btn of buttons) {
    btn.classList.replace("bg-[#3B82F6]", "bg-white");
    btn.classList.replace("text-white", "text-black");
  };

  const selected = document.getElementById(id);
  selected.classList.replace("bg-white", "bg-[#3B82F6]");
  selected.classList.replace("text-black", "text-white");

  if (id === "all-btn") {
    jobDetailsContainer.classList.remove("hidden");
    filterSection.classList.add("hidden");
  } else {
    jobDetailsContainer.classList.add("hidden");
    filterSection.classList.remove("hidden");

    if(id === 'interview-btn') {
      renderFilteredData(interviewData);
    } else {
      renderFilteredData(rejectedData);
    }
  }
  updateDashboard();
}

// Interview & Rejected render function
function renderFilteredData(data) {
  filterSection.innerHTML = "";

  for (const item of data) {
    const isInterview = item.jobStatus === "INTERVIEW";

    let div = document.createElement("div");
    div.className = "bg-white p-6 rounded-lg flex justify-between my-14";

    div.innerHTML = `
            <div>
                <h3 class="job-name text-[#002C5C] text-[20px] font-semibold">${item.jobName}</h3>
                <p class="job-title text-[#64748B] text-[16px]">${item.jobTitle}</p>
                <p class="salary text-[#64748B] text-[14px] my-[20px]">${item.salary}</p>
                <p class="status w-30 text-center py-1.5 px-3 rounded-md text-[14px] font-medium border ${isInterview ? "bg-green-100 border-green-500 text-green-700" : "bg-red-100 border-red-500 text-red-700"}">${item.jobStatus}</p>
                <p class="discription text-[#323B49] text-[14px] mt-2 mb-5">${item.jobDiscription}</p>
                <button class="interv-btn py-1.5 px-3 border rounded-md border-[#10B981] text-[#10B981] text-[14px] font-semibold cursor-pointer">INTERVIEW</button>
                <button class="reject-btn py-1.5 px-3 border rounded-md border-[#EF4444] text-[#EF4444] text-[14px] font-semibold cursor-pointer">REJECTED</button>
            </div>
            <div class="delete-btn w-9 h-9 border p-2 border-[#c7c7c7] flex items-center justify-center rounded-full text-gray-500 cursor-pointer">
                <i class="fa-regular fa-trash-can"></i>
            </div>`;

    filterSection.appendChild(div);
  }
}

// Buttton Click function
mainContainer.addEventListener("click", function (e) {
  const target = e.target;
  let card = target;

  while (card && card !== mainContainer && !card.classList.contains("bg-white")) {
    card = card.parentElement;
  }

  if (!card || card === mainContainer) {
    return;
  };

  const jobName = card.querySelector(".job-name").innerText;

  if (target.classList.contains("interv-btn")) {
    updateJobStatus(card, jobName, "INTERVIEW");
  }
  else if (target.classList.contains("reject-btn")) {
    updateJobStatus(card, jobName, "REJECTED");
  }
  else if (target.classList.contains("fa-trash-can") || target.parentElement.classList.contains("delete-btn")) {
    
    const allJobCards = jobDetailsContainer.children;

    for (const child of allJobCards) {
      const currentJobName = child.querySelector(".job-name").innerText;

      if (currentJobName === jobName) {
        child.remove();
        break; 
      }
    }

    interviewData = interviewData.filter((i) => i.jobName !== jobName);
    rejectedData = rejectedData.filter((i) => i.jobName !== jobName);

    if (currentStatus !== "all-btn") {
      card.remove();
    }

    updateDashboard();
  }
});

// Status Update function
function updateJobStatus(card, jobName, status) {

  const allJobCards = jobDetailsContainer.children;

  for (const child of allJobCards) {
    const currentJobName = child.querySelector(".job-name").innerText;

    if (currentJobName === jobName) {
      const statusEl = child.querySelector(".status");
      statusEl.innerText = status;

      if (status === "INTERVIEW") {
        statusEl.className = "status w-30 text-center py-1.5 px-3 rounded-md text-[14px] font-medium border bg-green-100 border-green-500 text-green-700";
      } else {
        statusEl.className = "status w-30 text-center py-1.5 px-3 rounded-md text-[14px] font-medium border bg-red-100 border-red-500 text-red-700";
      }
      break;
    }
  }

  const jobInfo = {
    jobName,
    jobTitle: card.querySelector(".job-title").innerText,
    salary: card.querySelector(".salary").innerText,
    jobStatus: status,
    jobDiscription: card.querySelector(".discription").innerText,
  };

  if (status === "INTERVIEW") {
    if (!interviewData.find((i) => i.jobName === jobName))
      interviewData.push(jobInfo);
    rejectedData = rejectedData.filter((i) => i.jobName !== jobName);
  } else {
    if (!rejectedData.find((i) => i.jobName === jobName))
      rejectedData.push(jobInfo);
    interviewData = interviewData.filter((i) => i.jobName !== jobName);
  }

  if (currentStatus === "interview-btn") renderFilteredData(interviewData);
  if (currentStatus === "rejected-btn") renderFilteredData(rejectedData);

  updateDashboard();
};
