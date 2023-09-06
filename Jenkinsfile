// pipeline {
//   agent any

//   tools {
//     nodejs 'node'
//   }

//   environment {
//     DOCKERHUB_REGISTRY = 'https://hub.docker.com/r/vipv/devopshint'
//     DOCKERHUB_CREDENTIALS_ID = 'doc1'
//   }

//   stages {
//     stage('Install dependencies') {
//       steps {
//         sh 'npm install'
//       }
//     }

//     stage('Test') {
//       steps {
//         sh 'npm test'
//       }
//     }

//     stage('Build Docker image') {
//       steps {
//         script {
//           sh 'docker build -t ${DOCKERHUB_REGISTRY}:${BUILD_NUMBER} .'
//         }
//       }
//     }

//     stage('Push Docker image') {
//       steps {
//         withCredentials([usernamePassword(
//           credentialsId: doc1,
//           passwordVariable: '9092897730',
//           usernameVariable: 'vipv'
//         )]) {
//           sh 'docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}'
//           sh 'docker push ${DOCKERHUB_REGISTRY}:${BUILD_NUMBER}'
//         }
//       }
//     }
//   }

//   post {
//     always {
//       sh 'docker logout'
//     }
//   }
// }
pipeline {
    agent any

    tools {
        nodejs 'node' // Use the name you configured in Jenkins for Node.js
    }

    environment {
        DOCKERHUB_REGISTRY = 'https://hub.docker.com/r/vipv/devopshint'
        DOCKERHUB_CREDENTIALS_ID = 'doc1'
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker image') {
            steps {
                script {
                    sh 'docker build -t ${DOCKERHUB_REGISTRY}:${BUILD_NUMBER} .'
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
                    sh 'docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}'
                    sh 'docker push ${DOCKERHUB_REGISTRY}:${BUILD_NUMBER}'
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}

