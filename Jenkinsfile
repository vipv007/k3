pipeline {
    agent any

    tools {
        nodejs 'node' // Use the name you configured in Jenkins for Node.js
    }

    environment {
        DOCKERHUB_REGISTRY = 'vipv/kuber'
        DOCKERHUB_CREDENTIALS_ID = 'dockerhub'
    }

    stages {
        stage('Install dependencies') {
            steps {
                bat 'npm install'
            }
        }

        // stage('Test') {
        //     steps {
        //         bat 'npm test'
        //     }
        // }

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
        withEnv(['DOCKERHUB_USERNAME=vipv', 'DOCKERHUB_PASSWORD=9092897730*']) {
          withCredentials([usernamePassword(
            credentialsId: DOCKERHUB_CREDENTIALS_ID,
            passwordVariable: 'DOCKERHUB_PASSWORD',
            usernameVariable: 'DOCKERHUB_USERNAME'
          )]) {
            bat "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}"
            bat "docker push ${DOCKERHUB_REGISTRY}:${BUILD_NUMBER}"
          }
        }
      }
    }
                stage('Kubernetes Configuration') {
            steps {
                script {
                    def kubeContext = 'docker-desktop'
                    def clusterDetails = '{"cluster":{"certificate-authority-data":"DATA+OMITTED","server":"https://kubernetes.docker.internal:6443"},"name":"docker-desktop"}'
                    def userDetails = '{"name":"docker-desktop","user":{"client-certificate-data":"DATA+OMITTED","client-key-data":"DATA+OMITTED"}}'
                    def kubeNamespace = 'kuber'

                    // Display information in the console output
                    echo "Current Kubernetes Context: ${kubeContext}"
                    echo "Cluster Details: ${clusterDetails}"
                    echo "User Details: ${userDetails}"
                    echo "Current Namespace: ${kubeNamespace}"
                }
            }
        }

        stage('Deploy to Kubernetes') {
    steps {
        script {
            def kubeConfig = readFile('D:\\kubeconfig.yaml') // Replace with the actual path to your kubeconfig file
            def fileName = 'D\\deployment.yaml' // Replace with the actual path to your deployment YAML file

            // Apply the Kubernetes configuration
            sh """
                echo \${kubeConfig} > kubeconfig.yaml
                kubectl --kubeconfig=kubeconfig.yaml apply -f ${fileName}
                rm kubeconfig.yaml
            """
        }
    }
}

        
    }

    post {
        always {
            bat 'docker logout'
        }
    }

}

