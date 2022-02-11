import { reactive } from 'vue'

const state = reactive({
	activities: [],
})

const methods =
{
    getToday: () => {
    	const todayDate = new Date().toISOString().slice(0, 10);
    	return todayDate;
    }
}

export default {
	state
}