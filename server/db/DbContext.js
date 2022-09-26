import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { JobSchema } from '../models/Job';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Jobs = mongoose.model('Job', JobSchema)
}

export const dbContext = new DbContext()
