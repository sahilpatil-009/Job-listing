const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const Job = require("../model/jobsSchema");
const authMiddleware = require("../middleware/auth.js");

router.get("/", async (req, res) => {
  const {limit, offset, salary, companyName, jobType, jobMode, jobLocation, skills} = req.query;
  const query = {};
  if(salary){
    query.salary = {$gte : salary, $lte : salary};
  }
  if(companyName){
    query.companyName = { $regex : companyName, $options: "i" };
  }
  const jobs = await Job.find(query).skip(offset || 0).limit(limit || 10);
  res.status(200).json(jobs);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    res.status(404).json({ success: false, message: "Job Not Found" });
  }
  res.status(200).json(job);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  const userId = req.user.id;
  if (!job) {
    return res.status(404).json({ success: false, message: "Job Not Found" });
  }
  if (userId !== job.user.toString()) {
    return res
      .status(401)
      .json({ success: false, message: "You are Not Authorized" });
  }
  await Job.deleteOne({ _id: id });
  res.status(200).json({ success: true, message: "Job Deleted" });
});

router.post("/", authMiddleware, async (req, res) => {
  const {
    companyName,
    companyLogoUrl,
    jobPosition,
    salary,
    jobType,
    jobMode,
    jobLocation,
    jobDescription,
    aboutCompany,
    skills,
    addInfo,
  } = req.body;

  if (
    !companyName ||
    !jobPosition ||
    !salary ||
    !jobType ||
    !jobMode ||
    !jobLocation ||
    !jobDescription ||
    !aboutCompany ||
    !skills
  ) {
    res.status(400).json({ success: false, message: "All fields Required" });
  }

  try {
    const user = req.user;
    const newJob = new Job({
      companyName,
      companyLogoUrl,
      jobPosition,
      salary,
      jobType,
      jobMode,
      jobLocation,
      jobDescription,
      aboutCompany,
      skills,
      addInfo,
      user: user.id,
    });
    await newJob.save();
    res.status(200).json(newJob);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in creating job" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const {
    companyName,
    companyLogoUrl,
    jobPosition,
    salary,
    jobType,
    jobMode,
    jobLocation,
    jobDescription,
    aboutCompany,
    skills,
    addInfo,
  } = req.body;
  const job = await Job.findById(id);

  if (!job) {
    return res.status(404).json({ success: false, message: "Job not found" });
  }

  if (job.user.toString() !== req.user.id) {
    return res.status(401).json({ message: "You are not Authorized" });
  }

  try {
    await Job.findByIdAndUpdate(id, {
      companyName,
      companyLogoUrl,
      jobPosition,
      salary,
      jobType,
      jobMode,
      jobLocation,
      jobDescription,
      aboutCompany,
      skills,
      addInfo,
    });
    res.status(200).json({ message: "Job update" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in updating job" });
  }
});

module.exports = router;
