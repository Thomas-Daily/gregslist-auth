import { BadRequest } from "@bcwdev/auth0provider/lib/Errors";
import { dbContext } from "../db/DbContext";
import { Forbidden } from "../utils/Errors";

class JobsService {

  async getJobs() {
    const jobs = await dbContext.Jobs.find()
    return jobs
  }

  async getJob(jobId) {
    const job = dbContext.Jobs.findById(jobId).populate('seller', 'name picture')
    if (!job) {
      throw new BadRequest('Invalid Job ID')
    }
    return (job)
  }

  async createJob(formData) {
    const job = await dbContext.Jobs.create(formData)
    return job
  }

  async editJob(jobData, userInfo) {
    const job = await this.getJob(jobData.id)

    if (userInfo.id != job.sellerId.toString()) {
      throw new Forbidden('Thats not your job... GO AWAY!!!!')
    }

    job.company = jobData.company || job.company
    job.jobTitle = jobData.jobTitle || job.jobTitle
    job.hours = jobData.hours || job.hours
    job.rate = jobData.rate || job.rate
    job.description = jobData.description || job.description

    await job.save()

    return job

  }


}

export const jobsService = new JobsService()