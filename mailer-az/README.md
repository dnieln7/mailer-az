# MailerAz

Simple mailer app to send emails using azure functions and kubernetes.

## Upload image to Azure container Registry

1.  Build image with docker

    ```
    docker build -t IMAGE_NAME:TAG .
    ```
    
2.  Tag image with ACR login server

    ```
    docker tag IMAGE_NAME:TAG ACR_LOGIN_SERVER/IMAGE_NAME:TAG
    ```
    
3.  Login to ACR

    ```
    docker login ACR_LOGIN_SERVER
    ```

4.  Push image to ACR

    ```
    docker push ACR_SERVER/IMAGE_NAME:TAG
    ```

## Deployment to kubernetes

1.  Login into an aks

    ```
    az aks get-credentials --resource-group RS_GROUP --name AKS_NAME
    ```
    
2.  Apply config file

    ```
    kubectl apply -f kubernetes.config.yaml
    ```

3.  Scale pods

    ```
    kubectl scale --replicas=5 deployment/mailer-az
    ```
    
4.  Scale nodes

    ```
    az aks scale --resource-group RS_GROUP --name AKS_NAME --node-count 3
    ```
