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
                    ./build.sh
                }
            }
        }
        stage('Deploy') {
            steps {
                scripts {
                    ./deploy.sh
                }
            }
        }
    }
}