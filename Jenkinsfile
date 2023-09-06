pipeline {
    agent any

    tools {
        nodejs 'node' // Use the name you configured in Jenkins for Node.js
    }

    environment {
        DOCKERHUB_REGISTRY = 'nginx'
        DOCKERHUB_CREDENTIALS_ID = 'doc1'
    }

    stages {
        stage('Install dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build Docker image') {
            steps {
                script {
                    def buildCommand = "docker build -t ${DOCKERHUB_REGISTRY}:${BUILD_NUMBER} ."
                    bat buildCommand
                }
            }
        }

        stage('Push Docker image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: doc1,
                    passwordVariable: '9092897730',
                    usernameVariable: 'vipv'
                )]) {
                    bat 'docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}'
                    bat 'docker push ${DOCKERHUB_REGISTRY}:${BUILD_NUMBER}'
                }
            }
        }
    }

    // post {
    //     always {
    //         bat 'docker logout'
    //     }
    // }
}

