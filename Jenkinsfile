pipeline {
    agent any
    tools{
        nodejs 'NodeJS 20'
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/utilisateur/mon-repo.git', branch: 'main'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                sh 'npx next dev'
            }
        }
    }
}
