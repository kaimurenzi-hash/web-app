pipeline {
    agent any

    environment {
        IMAGE_NAME = 'devops-webapp:1.0'
        CONTAINER_NAME = 'webapp-container'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'node --version'
                bat 'npm --version'
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker --version'
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }

        stage('Deploy with Docker') {
            steps {
                bat 'docker rm -f %CONTAINER_NAME% 2>NUL'
                bat 'docker run -d --name %CONTAINER_NAME% -p 8083:3000 %IMAGE_NAME%'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: tests passed and the application was deployed.'
        }
        failure {
            echo 'FAILURE: check the Jenkins Console Output.'
        }
        always {
            echo 'Jenkins pipeline execution finished.'
        }
    }
}
