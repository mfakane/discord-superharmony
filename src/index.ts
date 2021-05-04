import { Client } from '@yamdbf/core'
import { Config } from './config'
import { autoVoiceRole } from './plugins/autoVoiceRole'

if (require.main === module) {
  const config = new Config()
  const client = new Client({
    token: config.token,
    plugins: [autoVoiceRole(config.stateRoleInVoice)]
  }).start()
}
