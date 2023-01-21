pipeline {
    agent any
    stages {
        stage('Prep') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                scripts {
                    echo 'build'
                }
            }
        }
        stage('Deploy') {
            steps {
                scripts {
                    echo 'deploy'
                }
            }
        }
    }
}
