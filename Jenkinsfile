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
                    yarn install
                    yarn build
                }
            }
        }
        stage('Deploy') {
            steps {
                scripts {
                    echo 'it worked!'
                }
            }
        }
    }
}