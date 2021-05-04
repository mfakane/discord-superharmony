import { Client, Plugin, IPlugin, PluginConstructor, SharedProviderStorage, ListenerUtil } from '@yamdbf/core'
import { RoleResolvable, TextChannel, VoiceState } from 'discord.js'
const { on, once } = ListenerUtil

class AutoVoiceRole extends Plugin implements IPlugin {
	readonly name = 'AutoVoiceRole'

	constructor (private readonly client: Client, private readonly voiceRole: RoleResolvable) {
		super()
		ListenerUtil.registerListeners(client, this)
	}

	async init (storage: SharedProviderStorage) {

	}

	@on('clientReady') private async __clientReady () {
		console.log(`Invitation URL: ${await this.client.generateInvite({ permissions: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'MANAGE_ROLES'] })}`)
	}

	@on('voiceStateUpdate') private async __onVoiceStateUpdate (oldState: VoiceState, newState: VoiceState) {
		const guild = newState.guild
		const member = newState.member
		const voiceRole = guild.roles.resolve(this.voiceRole)
		if (!guild || !member || !voiceRole) return

		if (!oldState.channel && newState.channel) {
			await member.roles.add(voiceRole)
		} else if (oldState.channel && !newState.channel) {
			await member.roles.remove(voiceRole)
		}
	}
}

export function autoVoiceRole (voiceRole: RoleResolvable): PluginConstructor {
	return class extends AutoVoiceRole {
		constructor (client: Client) {
			super(client, voiceRole)
		}
	}
}
