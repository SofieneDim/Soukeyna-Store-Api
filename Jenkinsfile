node {

	def remote = [:]
	remote.name = 'root'
	remote.host = '161.97.134.15'
	remote.user = 'root'
	remote.password = '3637pTVU55o8'
	remote.allowAnyHosts = true

	stage('Remote SSH') {
		sshCommand remote: remote, command: "ls -lrt"
	}

	stage('Build') {
		sshCommand remote: remote, command: "cd /root/test/backend && git reset --hard"
		sshCommand remote: remote, command: "cd /root/test/backend && git pull origin main"
		sshCommand remote: remote, command: "cd /root/test/backend && rm -rf node_modules package-lock.json"
		sshCommand remote: remote, command: "cd /root/test/backend && docker build -t sk-api ."
	}

    stage('Deploy'){
        sshCommand remote: remote, command: "docker stop sk-api || true"
        sshCommand remote: remote, command: "docker rm -f sk-api || true"
        sshCommand remote: remote, command: "docker run -d --name sk-api --restart always -p 8001:8001 sk-api"
    }

}
