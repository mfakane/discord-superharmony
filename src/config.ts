import { RoleResolvable } from 'discord.js'

export class Config {
  constructor () {
    require('dotenv-safe').config({ allowEmptyValues: true })
  }

  get token () {
    return process.env.DISCORD_TOKEN
  }

  get prefix () {
    return process.env.DISCORD_PREFIX
  }

  get stateRoleInVoice (): RoleResolvable {
    return process.env.STATE_ROLE_IN_VOICE!
  }
}