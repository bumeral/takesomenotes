export default {
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-api-prod-serverlessdeploymentbucket-izohnjyx0asv"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://j6jhlcgkqc.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_ZfjGsLm3b",
    APP_CLIENT_ID: "146sf5ot4hcugca7h4p8iruhle",
    IDENTITY_POOL_ID: "us-east-1:5240257b-cea3-4bc4-8728-0492fc393fbf"
  },
  MAX_ATTACHMENT_SIZE: 50000000
};
