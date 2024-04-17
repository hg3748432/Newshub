import mongoose from 'mongoose';

const newsItemSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		postedBy: {
			type: Object,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('NewsItems', newsItemSchema);
