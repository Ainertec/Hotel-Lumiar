/* eslint-disable no-param-reassign */
import { Schema, model } from 'mongoose';
import { RuleInterface } from '../../interfaces/base';

const RuleSchema = new Schema<RuleInterface>(
  {
    description: {
      type: String,
      required: true,
    },
    atention: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default model<RuleInterface>('Rule', RuleSchema);
