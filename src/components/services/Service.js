import {
	showMessage
} from '../../utils/helpers'
import {
	spawn
} from 'child_process'

export default {
	template: `<li>
					<span>{{ name }}</span>
					<input type="checkbox" class="switch" :id="name" :checked="isRun" @change="statusChange" />
					<label :for="name" class="fr"></label>
				</li>`,
	props: ['name', 'is-run'],
	methods: {
		statusChange(e) {
			let serviceName = e.target.id
			let status = e.target.checked ? 'start' : 'stop'

			if (!this.isBusy) {
				this.isBusy = true
				sudo.exec(command(`service ${serviceName} ${status}`), {
						name: 'Stacer'
					},
					(error, stdout, stderr) => {
						if (stderr) {
							e.target.checked = !status
							showMessage('Operation not successful.', 'error')
						} else {
							showMessage(serviceName + ' service ' + status + (e.target.checked ? 'ed' : 'ped'), 'success')
						}

						this.isBusy = false
					})
			} else {
				showMessage('Another process continues.', 'error')
			}
		}		
	}
}