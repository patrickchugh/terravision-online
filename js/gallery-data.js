// Generated from terravision/docs/gallery.md
window.TV_GALLERY = [
 {
  "id": "aws-three-tier-web-application-architecture-diagram",
  "title": "AWS three-tier web application",
  "provider": "aws",
  "img": "three-tier-web",
  "w": 1400,
  "h": 1595,
  "prompt": "Draw an AWS three-tier web app: CloudFront in front of an S3 static site and an Application Load Balancer, EC2 app servers in an Auto Scaling group across private subnets in two availability zones, scaled by a CloudWatch CPU alarm, Aurora PostgreSQL and ElastiCache in data subnets, NAT gateways in the public subnets, an S3 gateway endpoint for an uploads bucket and a Secrets Manager interface endpoint in each private subnet.",
  "source": "three-tier-web"
 },
 {
  "id": "amazon-eks-karpenter-architecture-diagram",
  "title": "Amazon EKS with Karpenter",
  "provider": "aws",
  "img": "aws-eks-karpenter",
  "w": 1400,
  "h": 1090,
  "prompt": "Draw an EKS cluster that uses Karpenter for node autoscaling, across three availability zones: an ALB and NAT gateway in each public subnet; the Karpenter controller, a NodePool of On-Demand and Spot nodes and interface VPC endpoints for ECR, EC2 and SQS in each private subnet; Aurora PostgreSQL in data subnets; an S3 gateway endpoint; Route 53 in front; and the EventBridge rule and SQS queue Karpenter uses for Spot interruptions.",
  "source": "aws-eks-karpenter"
 },
 {
  "id": "aws-serverless-event-driven-architecture-diagram",
  "title": "AWS serverless event-driven",
  "provider": "aws",
  "img": "aws-serverless-event-driven",
  "w": 1400,
  "h": 1109,
  "prompt": "Draw an AWS serverless event-driven order system with every Lambda in a VPC across two availability zones: API Gateway with Cognito invoking order Lambdas in private subnets, a DynamoDB gateway endpoint, interface endpoints for EventBridge, SNS and Secrets Manager in an endpoints subnet per zone, and NAT gateways only for the payment provider. The EventBridge bus fans out to a Step Functions fulfilment workflow, an SQS notifications queue with a DLQ, and Firehose to an S3 data lake with Glue and Athena.",
  "source": "aws-serverless-event-driven"
 },
 {
  "id": "aws-data-lake-architecture-diagram",
  "title": "AWS data lake",
  "provider": "aws",
  "img": "aws-data-lake",
  "w": 1400,
  "h": 1090,
  "prompt": "Draw an AWS data lake with processing in a VPC across two availability zones: DMS from Aurora MySQL, Glue jobs, EMR Serverless, MWAA and Redshift Serverless in private subnets, an S3 gateway endpoint, and Glue and Secrets Manager interface endpoints in each zone. Kinesis, Firehose and Transfer Family land data in a raw S3 zone, Glue writes a curated zone, Lake Formation governs it, and QuickSight and Athena serve analysts.",
  "source": "aws-data-lake"
 },
 {
  "id": "aws-multi-region-failover-architecture-diagram",
  "title": "AWS multi-region failover",
  "provider": "aws",
  "img": "aws-multi-region",
  "w": 1400,
  "h": 1779,
  "prompt": "Draw an AWS active-passive multi-region architecture: Route 53 failover between a primary region and a standby region, each with a VPC across two availability zones, ALBs in public subnets, ECS Fargate services in app subnets, Aurora PostgreSQL in data subnets and a DynamoDB gateway endpoint. Show Aurora Global Database replication, DynamoDB global tables and S3 cross-region replication between the regions.",
  "source": "aws-multi-region"
 },
 {
  "id": "aws-multi-account-network-architecture-diagram",
  "title": "AWS multi-account network with Direct Connect",
  "provider": "aws",
  "img": "aws-multi-account-network",
  "w": 1400,
  "h": 1629,
  "prompt": "Draw an AWS multi-account network: a corporate data centre with office staff, an ERP server and a router connected by Direct Connect and a Direct Connect gateway to a Transit Gateway in a network account, with a site-to-site VPN as backup; an inspection VPC with Network Firewall in two availability zones; a central egress VPC with NAT gateways; and spoke VPCs for production (internal ALB, ECS Fargate, RDS), development (EC2) and shared services (VPC endpoints, Directory Service).",
  "source": "aws-multi-account-network"
 },
 {
  "id": "aws-event-driven-order-processing-architecture-diagram",
  "title": "AWS event-driven order processing",
  "provider": "aws",
  "img": "aws-event-driven",
  "w": 1400,
  "h": 2813,
  "prompt": "Draw an AWS event-driven order system with Lambdas in a VPC across two availability zones: mobile clients call an API Gateway REST API with WAF and a Cognito authorizer, a create-order Lambda saves to DynamoDB through a gateway endpoint and queues on SQS, a fulfilment Lambda notifies through SNS, SQS and SNS are reached through interface endpoints and have dead-letter queues, and DynamoDB changes flow through Kinesis and Firehose to an S3 archive with Glue and Athena.",
  "source": "aws-event-driven"
 },
 {
  "id": "amazon-ecs-fargate-api-architecture-diagram",
  "title": "Amazon ECS on Fargate API",
  "provider": "aws",
  "img": "aws-ecs-fargate-api",
  "w": 1400,
  "h": 990,
  "prompt": "Draw an Amazon ECS on Fargate API across two availability zones: Route 53 and an Application Load Balancer with AWS WAF in public subnets, API and worker tasks in private subnets, Aurora PostgreSQL and ElastiCache in data subnets, interface endpoints for ECR, SQS and Secrets Manager, an S3 gateway endpoint, an SQS job queue with a dead-letter queue feeding the worker, and NAT gateways for the worker's calls to an email provider.",
  "source": "aws-ecs-fargate-api"
 },
 {
  "id": "aws-streaming-analytics-architecture-diagram",
  "title": "AWS real-time streaming analytics",
  "provider": "aws",
  "img": "aws-streaming-analytics",
  "w": 1400,
  "h": 1944,
  "prompt": "Draw an AWS real-time streaming analytics platform: mobile apps writing to Kinesis Data Streams, a Managed Service for Apache Flink application in private subnets across two availability zones reading through a Kinesis interface endpoint and indexing into OpenSearch, Redshift Serverless with streaming ingestion queried by QuickSight, an S3 gateway endpoint for Flink checkpoints, and Firehose delivering Parquet to an S3 event lake with a Glue crawler and Athena.",
  "source": "aws-streaming-analytics"
 },
 {
  "id": "amazon-sagemaker-mlops-architecture-diagram",
  "title": "Amazon SageMaker MLOps",
  "provider": "aws",
  "img": "aws-sagemaker-mlops",
  "w": 1400,
  "h": 1074,
  "prompt": "Draw an Amazon SageMaker MLOps platform in a VPC across two availability zones: SageMaker Studio in VPC-only mode reached through Client VPN, Feature Store, a Step Functions retraining workflow started weekly by EventBridge Scheduler that runs SageMaker Pipelines and registers models in the Model Registry, a real-time endpoint called by a Lambda function behind API Gateway, SageMaker API and runtime interface endpoints, and an S3 gateway endpoint for training data and model artifacts.",
  "source": "aws-sagemaker-mlops"
 },
 {
  "id": "aws-iot-telemetry-architecture-diagram",
  "title": "AWS IoT telemetry",
  "provider": "aws",
  "img": "aws-iot-telemetry",
  "w": 1400,
  "h": 2282,
  "prompt": "Draw an AWS IoT telemetry platform for a wind farm: turbine sensors and an IoT Greengrass gateway on site publishing to IoT Core, IoT rules routing readings to Kinesis Data Streams, alarms to an IoT Events detector model with SNS alerts, and everything to Firehose and an S3 archive, with Lambda functions in a VPC across two availability zones writing to Timestream through an interface endpoint for operators using Amazon Managed Grafana.",
  "source": "aws-iot-telemetry"
 },
 {
  "id": "aws-direct-connect-hybrid-architecture-diagram",
  "title": "AWS Direct Connect hybrid",
  "provider": "aws",
  "img": "aws-hybrid-direct-connect",
  "w": 1400,
  "h": 1962,
  "prompt": "Draw an AWS hybrid network for a head office: staff, DNS servers, a File Gateway and a router connected by Direct Connect, a transit VIF and a Direct Connect gateway to a Transit Gateway, with a site-to-site VPN as backup, and a VPC across two availability zones with an internal ALB, EC2 app servers, Multi-AZ RDS for Oracle, Route 53 Resolver inbound and outbound endpoints with a private hosted zone, Storage Gateway and S3 interface endpoints, and AWS Backup.",
  "source": "aws-hybrid-direct-connect"
 },
 {
  "id": "aws-static-site-cicd-architecture-diagram",
  "title": "AWS static website with CI/CD",
  "provider": "aws",
  "img": "aws-static-site-cicd",
  "w": 1400,
  "h": 1564,
  "prompt": "Draw an AWS static website with CI/CD: Route 53, AWS WAF and an ACM certificate on a CloudFront distribution reading a private S3 bucket through origin access control, with a cross-Region replica bucket as failover origin, Lambda@Edge security headers and an access-log bucket, and a release where a GitHub push through CodeConnections starts CodePipeline, whose CodeBuild projects build, deploy to a staging bucket and distribution, run browser tests and deploy production, with SNS and AWS Chatbot notifying Slack.",
  "source": "aws-static-site-cicd"
 },
 {
  "id": "aws-batch-hpc-architecture-diagram",
  "title": "AWS Batch HPC",
  "provider": "aws",
  "img": "aws-batch-hpc",
  "w": 1400,
  "h": 2123,
  "prompt": "Draw an AWS Batch HPC genomics pipeline: an S3 upload triggering an EventBridge rule and a Step Functions workflow that submits array jobs to AWS Batch compute environments running EC2 Spot instances in private subnets across two availability zones, FSx for Lustre linked to the upload bucket, ECR and CloudWatch Logs interface endpoints, an S3 gateway endpoint for results, a DynamoDB run table and SNS notifications to researchers.",
  "source": "aws-batch-hpc"
 },
 {
  "id": "aws-saas-multi-tenant-architecture-diagram",
  "title": "AWS SaaS multi-tenant",
  "provider": "aws",
  "img": "aws-saas-multi-tenant",
  "w": 1400,
  "h": 1701,
  "prompt": "Draw an AWS multi-tenant SaaS platform: API Gateway HTTP API with a Cognito JWT authorizer and a VPC link to internal ALBs across two availability zones, ECS Fargate services for a pooled tier, a premium silo tenant and tenant management, Aurora PostgreSQL with a schema per tenant plus a dedicated premium cluster, a DynamoDB tenant registry and S3 tenant files through gateway endpoints, EventBridge and Secrets Manager interface endpoints, a Step Functions provisioning workflow and Firehose usage metering.",
  "source": "aws-saas-multi-tenant"
 },
 {
  "id": "aws-payments-processing-architecture-diagram",
  "title": "AWS payments processing",
  "provider": "aws",
  "img": "aws-payments-processing",
  "w": 1400,
  "h": 1177,
  "prompt": "Draw an AWS card payments platform across three availability zones: API Gateway with mutual TLS and AWS WAF, a VPC link to Network Load Balancers, ECS Fargate authorisation and settlement services, Aurora PostgreSQL Multi-AZ with a writer and readers, a DynamoDB idempotency table through a gateway endpoint, an SQS FIFO settlement queue with a dead-letter queue, CloudHSM in its own subnets, KMS, a Secrets Manager interface endpoint and a PrivateLink endpoint to the card network.",
  "source": "aws-payments-processing"
 },
 {
  "id": "aws-security-logging-architecture-diagram",
  "title": "AWS security logging",
  "provider": "aws",
  "img": "aws-security-logging",
  "w": 1400,
  "h": 2567,
  "prompt": "Draw AWS organisation security logging by account: an organisation CloudTrail trail in the management account; Config, GuardDuty and VPC flow logs in workload accounts; a log archive account with S3 buckets using Object Lock; and a security tooling account with the delegated GuardDuty administrator, Security Hub, Config rules, an EventBridge rule for high-severity findings driving a remediation Lambda, SNS and AWS Chatbot to Slack, Firehose to OpenSearch in a VPC, and Athena with Glue.",
  "source": "aws-security-logging"
 },
 {
  "id": "aws-media-processing-architecture-diagram",
  "title": "AWS video processing",
  "provider": "aws",
  "img": "aws-media-processing",
  "w": 1400,
  "h": 2655,
  "prompt": "Draw an AWS video-on-demand platform: creators uploading through presigned URLs from an API Gateway HTTP API with Cognito, an S3 upload bucket archiving masters to Glacier, an EventBridge rule starting a Step Functions workflow with a Lambda probe, MediaConvert, Rekognition moderation, a DynamoDB catalogue and SNS notifications, and viewers streaming HLS from S3 through CloudFront with signed URLs, origin access control, AWS WAF and Route 53.",
  "source": "aws-media-processing"
 },
 {
  "id": "aws-vm-lift-and-shift-architecture-diagram",
  "title": "AWS VM lift-and-shift migration",
  "provider": "aws",
  "img": "aws-vm-lift-and-shift",
  "w": 1400,
  "h": 2277,
  "prompt": "Draw an AWS lift-and-shift of a Windows three-tier app: on-premises web, app, SQL Server and file servers replicating with Application Migration Service over a site-to-site VPN to a replication server in a staging subnet; then, across two availability zones, an internet-facing ALB, EC2 web and app Auto Scaling groups with an internal ALB, Multi-AZ RDS for SQL Server, FSx for Windows File Server with AWS Managed Microsoft AD, NAT gateways, Systems Manager patching through interface endpoints and AWS Backup.",
  "source": "aws-vm-lift-and-shift"
 },
 {
  "id": "azure-three-tier-web-application-architecture-diagram",
  "title": "Azure three-tier web application",
  "provider": "azure",
  "img": "azure-three-tier",
  "w": 1400,
  "h": 2190,
  "prompt": "Draw an Azure three-tier web app: Front Door with WAF, a Static Web App, Application Gateway in its own subnet, Container Apps across two zones, Azure SQL behind a private endpoint, a NAT gateway, and Key Vault, Log Analytics and a container registry as shared services.",
  "source": "azure-three-tier"
 },
 {
  "id": "azure-hub-and-spoke-architecture-diagram",
  "title": "Azure hub-and-spoke network",
  "provider": "azure",
  "img": "azure-hub-spoke",
  "w": 1400,
  "h": 1846,
  "prompt": "Draw an Azure hub-and-spoke landing zone: a hub VNet with a VPN gateway to the head office, Azure Firewall with a firewall policy, Bastion and a Private DNS Resolver, peered to two spokes. One spoke runs a public web app (Application Gateway, a VM scale set across two zones with a CPU autoscale setting, Azure SQL via private endpoint). The other runs an internal Windows VM with PostgreSQL Flexible Server via private endpoint. Send outbound traffic through the firewall.",
  "source": "azure-hub-spoke"
 },
 {
  "id": "azure-aks-architecture-diagram",
  "title": "Azure AKS microservices",
  "provider": "azure",
  "img": "azure-aks",
  "w": 1400,
  "h": 1108,
  "prompt": "Draw an AKS microservices platform on Azure: Front Door with WAF in front of an Application Gateway, an AKS cluster with autoscaling node pools across three zones, Cosmos DB, Service Bus and Redis reached through private endpoints in their own subnet, a NAT gateway for egress, and ACR, Key Vault, Log Analytics and Azure Monitor as shared services.",
  "source": "azure-aks"
 },
 {
  "id": "azure-app-service-customer-portal-architecture-diagram",
  "title": "Azure App Service customer portal",
  "provider": "azure",
  "img": "azure-web-app",
  "w": 1400,
  "h": 2013,
  "prompt": "Draw an Azure customer portal: Azure DNS and Front Door with a WAF policy reaching a Linux App Service over a Private Link origin, the web app and two Function Apps (API and worker) in VNet integration subnets, private endpoints for the API, Azure SQL, Service Bus, Blob Storage and Redis in their own subnet, a NAT gateway with a public IP for outbound email, and Key Vault, Application Insights, Log Analytics and private DNS zones as shared services.",
  "source": "azure-web-app"
 },
 {
  "id": "azure-container-apps-microservices-architecture-diagram",
  "title": "Azure Container Apps microservices",
  "provider": "azure",
  "img": "azure-container-apps-microservices",
  "w": 1400,
  "h": 1963,
  "prompt": "Draw Azure Container Apps microservices in an internal zone-redundant environment in a virtual network, with Azure DNS and Front Door with WAF over Private Link, storefront, orders, payments and KEDA-scaled fulfilment apps, a nightly Container Apps job, private endpoints for Cosmos DB, Azure SQL, Service Bus and Azure Managed Redis, a NAT gateway to the payment provider, and Container Registry, Key Vault, Log Analytics and Application Insights as shared services.",
  "source": "azure-container-apps-microservices"
 },
 {
  "id": "azure-serverless-event-driven-architecture-diagram",
  "title": "Azure serverless event-driven",
  "provider": "azure",
  "img": "azure-serverless-events",
  "w": 1400,
  "h": 1194,
  "prompt": "Draw an Azure serverless event-driven order system with API Management in a subnet, Flex Consumption Function Apps for the orders API, a Cosmos DB change feed projector, fulfilment and notifications, a Logic App to the ERP, an Event Grid topic delivering to a Service Bus topic, private endpoints for the API, Cosmos DB, Event Grid, Service Bus and Blob Storage, a NAT gateway to Communication Services email, and Key Vault and Application Insights as shared services.",
  "source": "azure-serverless-events"
 },
 {
  "id": "azure-databricks-lakehouse-architecture-diagram",
  "title": "Azure Databricks lakehouse",
  "provider": "azure",
  "img": "azure-lakehouse",
  "w": 1400,
  "h": 2179,
  "prompt": "Draw an Azure Databricks lakehouse with ERP and CRM databases in an on-premises data centre connected by site-to-site VPN, a VPN gateway, a self-hosted integration runtime VM and a VNet-injected Databricks workspace in their own subnets, a Data Factory pipeline, ADLS Gen2 bronze, silver and gold containers, private endpoints for Data Factory, Databricks and the lake, a NAT gateway, Power BI for analysts, and Key Vault and Purview as shared services.",
  "source": "azure-lakehouse"
 },
 {
  "id": "azure-streaming-analytics-architecture-diagram",
  "title": "Azure real-time streaming analytics",
  "provider": "azure",
  "img": "azure-streaming-analytics",
  "w": 1400,
  "h": 2887,
  "prompt": "Draw Azure real-time clickstream analytics with Front Door and WAF in front of an App Service storefront that sends clicks to Event Hubs, Event Hubs Capture to ADLS Gen2, a data connection to Azure Data Explorer, a Stream Analytics job and an anomaly Function App in a stream processing subnet, Cosmos DB shopper profiles, private endpoints for Event Hubs, Cosmos DB and Data Explorer, Managed Grafana dashboards, and a Monitor action group for alerts.",
  "source": "azure-streaming-analytics"
 },
 {
  "id": "azure-machine-learning-mlops-architecture-diagram",
  "title": "Azure Machine Learning MLOps",
  "provider": "azure",
  "img": "azure-ml-mlops",
  "w": 1400,
  "h": 2394,
  "prompt": "Draw Azure Machine Learning MLOps with data scientists on point-to-site VPN, a VPN gateway, self-hosted GitHub runners on a VM scale set with a NAT gateway, a GPU compute cluster and compute instances in a training subnet, AKS inference with the Azure ML extension, an App Service claims app, private endpoints for the workspace and Blob Storage training data and models, and Container Registry, Key Vault and Application Insights as shared services.",
  "source": "azure-ml-mlops"
 },
 {
  "id": "azure-iot-telemetry-architecture-diagram",
  "title": "Azure IoT telemetry",
  "provider": "azure",
  "img": "azure-iot-telemetry",
  "w": 1400,
  "h": 1264,
  "prompt": "Draw Azure IoT factory telemetry with an OPC UA server and an IoT Edge gateway on the factory site, the Device Provisioning Service, IoT Hub routing to Blob Storage and a data connection to Azure Data Explorer, Stream Analytics anomaly detection writing to an Event Hub, alerting and Digital Twins sync Function Apps in a processing subnet, private endpoints, Managed Grafana for plant engineers, and a Monitor action group for maintenance alerts.",
  "source": "azure-iot-telemetry"
 },
 {
  "id": "azure-expressroute-hybrid-architecture-diagram",
  "title": "Azure ExpressRoute hybrid network",
  "provider": "azure",
  "img": "azure-hybrid-expressroute",
  "w": 1400,
  "h": 3627,
  "prompt": "Draw an Azure ExpressRoute hybrid network with workstations, DNS and app servers and BGP edge routers in a corporate data centre, an ExpressRoute circuit to an ExpressRoute gateway, a backup site-to-site VPN gateway, a hub with Azure Firewall and its policy, a DNS Private Resolver and Bastion, a peered spoke with an internal load balancer, ERP VMs in two zones and SQL Managed Instance, and Log Analytics and a backup vault as shared services.",
  "source": "azure-hybrid-expressroute"
 },
 {
  "id": "azure-multi-region-disaster-recovery-architecture-diagram",
  "title": "Azure multi-region disaster recovery",
  "provider": "azure",
  "img": "azure-multi-region-dr",
  "w": 1400,
  "h": 1535,
  "prompt": "Draw an Azure active-passive multi-region design across East US 2 and Central US with Azure DNS and Front Door with WAF routing by priority to App Service web apps, worker Function Apps behind Traffic Manager for partner webhooks, an Azure SQL failover group, RA-GZRS Blob Storage, Cosmos DB in both regions, private endpoints and Key Vault in each region, and Log Analytics and a geo-replicated Container Registry as shared services.",
  "source": "azure-multi-region-dr"
 },
 {
  "id": "azure-static-web-apps-cicd-architecture-diagram",
  "title": "Azure Static Web Apps with CI/CD",
  "provider": "azure",
  "img": "azure-static-web-app-cicd",
  "w": 1400,
  "h": 1836,
  "prompt": "Draw Azure Static Web Apps with CI/CD: Azure DNS and Front Door with WAF serving the site and a Blob media container, Entra External ID sign-in, a linked API Function App and a contact Function App in a VNet integration subnet, private endpoints for Cosmos DB and a Service Bus queue, a NAT gateway to Communication Services email, GitHub Actions deploying with OIDC, and Key Vault and Application Insights as shared services.",
  "source": "azure-static-web-app-cicd"
 },
 {
  "id": "azure-batch-hpc-architecture-diagram",
  "title": "Azure Batch HPC",
  "provider": "azure",
  "img": "azure-batch-hpc",
  "w": 1400,
  "h": 1748,
  "prompt": "Draw Azure Batch HPC with simulation engineers using an App Service job portal, a Batch account with dedicated and Spot HBv4 pools in a compute subnet, Azure NetApp Files scratch in a delegated subnet, Blob Storage inputs and results, private endpoints for Batch and Blob Storage, a VPN gateway to a FlexLM licence server in the corporate data centre, and Container Registry, Key Vault and Log Analytics as shared services.",
  "source": "azure-batch-hpc"
 },
 {
  "id": "azure-saas-multi-tenant-architecture-diagram",
  "title": "Azure SaaS multi-tenant",
  "provider": "azure",
  "img": "azure-saas-multi-tenant",
  "w": 1400,
  "h": 2560,
  "prompt": "Draw an Azure multi-tenant SaaS application with Azure DNS and Front Door with WAF and custom domains per tenant, a Private Link service to an AKS cluster with node pools in three zones, Entra External ID sign-in, private endpoints for a tenant catalog in Azure SQL, an elastic pool and a premium tenant database, Azure Managed Redis, App Configuration and a Service Bus provisioning queue, an onboarding Function App, and Container Registry and Key Vault as shared services.",
  "source": "azure-saas-multi-tenant"
 },
 {
  "id": "azure-payments-processing-architecture-diagram",
  "title": "Azure payments processing",
  "provider": "azure",
  "img": "azure-payments-processing",
  "w": 1400,
  "h": 1137,
  "prompt": "Draw an Azure PCI DSS payments platform with a hub virtual network holding Azure Firewall with its policy and Bastion, a peered cardholder data spoke with Application Gateway WAF v2, a private AKS cluster in two zones and a settlement Function App, private endpoints for Managed HSM, Azure SQL with Always Encrypted, a Service Bus queue and immutable Blob audit logs, egress to the card networks, and Defender for Cloud and DDoS protection as shared services.",
  "source": "azure-payments-processing"
 },
 {
  "id": "azure-security-monitoring-architecture-diagram",
  "title": "Azure security monitoring with Microsoft Sentinel",
  "provider": "azure",
  "img": "azure-security-monitoring",
  "w": 1400,
  "h": 2308,
  "prompt": "Draw Azure security monitoring with Microsoft Sentinel collecting syslog from data centre firewalls over a site-to-site VPN to log forwarder VMs in the hub, Azure Firewall diagnostics, VNet flow logs, the activity log export, Entra ID and Defender for Cloud data connectors, an analytics rule triggering a Logic App containment playbook that blocks IPs in the firewall policy and notifies Teams, SOC analysts, and Blob Storage archive.",
  "source": "azure-security-monitoring"
 },
 {
  "id": "azure-video-processing-architecture-diagram",
  "title": "Azure video processing",
  "provider": "azure",
  "img": "azure-media-processing",
  "w": 1400,
  "h": 2775,
  "prompt": "Draw Azure video processing with creators uploading to Blob Storage with SAS from an App Service studio app, Event Grid Blob events to a Service Bus transcode queue, FFmpeg transcode and thumbnail Container Apps jobs on a GPU profile, Video Indexer through a NAT gateway, a Cosmos DB catalogue, private endpoints, Azure DNS and Front Door with WAF streaming HLS and DASH renditions over Private Link, and Container Registry and Key Vault as shared services.",
  "source": "azure-media-processing"
 },
 {
  "id": "azure-vm-scale-sets-migration-architecture-diagram",
  "title": "Azure VM Scale Sets web application migration",
  "provider": "azure",
  "img": "azure-vm-scale-set-web",
  "w": 1400,
  "h": 1134,
  "prompt": "Draw an Azure web application migrated from a corporate data centre with web servers and SQL Server over a site-to-site VPN, an Azure Migrate vault and Database Migration Service, Azure DNS and Application Gateway WAF v2 in front of a Linux VM Scale Set across three zones with autoscale, private endpoints for zone-redundant Azure SQL, Azure Files and Managed Redis, a NAT gateway to the payment provider, Bastion, and a Compute Gallery as a shared service.",
  "source": "azure-vm-scale-set-web"
 },
 {
  "id": "google-cloud-three-tier-web-application-architecture-diagram",
  "title": "Google Cloud three-tier web application",
  "provider": "gcp",
  "img": "gcp-three-tier",
  "w": 1400,
  "h": 1226,
  "prompt": "Draw a GCP three-tier web app: a global HTTPS load balancer with Cloud Armor and a backend bucket serving a React site from Cloud Storage, a regional managed instance group across two zones that autoscales on CPU and autoheals on a health check, Cloud SQL and Memorystore on private IPs, Cloud Router and Cloud NAT, Secret Manager and Artifact Registry.",
  "source": "gcp-three-tier"
 },
 {
  "id": "google-cloud-gke-architecture-diagram",
  "title": "Google Cloud GKE microservices",
  "provider": "gcp",
  "img": "gcp-gke",
  "w": 1400,
  "h": 2864,
  "prompt": "Draw a GKE microservices platform on Google Cloud: a global HTTPS load balancer with Cloud Armor, a regional GKE cluster with a node pool across three zones scaled by the cluster and Horizontal Pod Autoscalers, a Private Service Connect endpoint for Cloud SQL in the node subnet, a Private Service Connect endpoint for Google APIs used to reach Pub/Sub, Pub/Sub triggering a Cloud Run service that writes to Firestore, a BigQuery dataset, Cloud NAT, Artifact Registry and Secret Manager.",
  "source": "gcp-gke"
 },
 {
  "id": "google-cloud-data-pipeline-architecture-diagram",
  "title": "Google Cloud data pipeline",
  "provider": "gcp",
  "img": "gcp-data-pipeline",
  "w": 1400,
  "h": 1188,
  "prompt": "Draw a Google Cloud data platform with processing in a VPC network: streaming and batch Dataflow jobs and a Dataproc Serverless transform in a processing subnet, Cloud Composer in an orchestration subnet, a Private Service Connect endpoint for Google APIs, and Cloud SQL on a private IP feeding Datastream. Pub/Sub and a Cloud Storage landing bucket for ingestion; raw and curated BigQuery datasets, Bigtable and Dataplex; Looker, Vertex AI and a Cloud Run API for serving.",
  "source": "gcp-data-pipeline"
 },
 {
  "id": "google-cloud-serverless-api-architecture-diagram",
  "title": "Google Cloud serverless API",
  "provider": "gcp",
  "img": "gcp-serverless-api",
  "w": 1400,
  "h": 1726,
  "prompt": "Draw a serverless API on Google Cloud: a global HTTPS load balancer with Cloud Armor and a serverless NEG in front of Cloud Run, Cloud Run and a Cloud Function using Direct VPC egress into a subnet, Memorystore on the VPC, Cloud SQL Postgres through a Private Service Connect endpoint, a Private Service Connect endpoint for Google APIs, Pub/Sub with Eventarc and a dead-letter topic, BigQuery, Cloud Storage, Cloud NAT, and Cloud Build deploying from Artifact Registry.",
  "source": "gcp-serverless-api"
 },
 {
  "id": "google-cloud-shared-vpc-landing-zone-architecture-diagram",
  "title": "Google Cloud Shared VPC landing zone",
  "provider": "gcp",
  "img": "gcp-shared-vpc-landing-zone",
  "w": 1400,
  "h": 1186,
  "prompt": "Draw a Google Cloud landing zone with a Shared VPC in a host project spanning europe-west2 and europe-west1, HA VPN and Cloud Router to a corporate data centre, prod VMs in two zones behind an internal load balancer, Private Service Connect endpoints for Cloud SQL and Google APIs, prod and nonprod service projects, Cloud Workstations, and a security project with an organisation log sink, Security Command Center notifications, organisation policy and a VPC Service Controls perimeter.",
  "source": "gcp-shared-vpc-landing-zone"
 },
 {
  "id": "google-cloud-run-microservices-architecture-diagram",
  "title": "Google Cloud Run microservices",
  "provider": "gcp",
  "img": "gcp-cloud-run-microservices",
  "w": 1400,
  "h": 1179,
  "prompt": "Draw Google Cloud Run microservices with a global external Application Load Balancer, Cloud Armor and a serverless NEG to a storefront service, internal orders, payments and notifications services with Direct VPC egress in us-central1, Memorystore, Private Service Connect endpoints for Cloud SQL and Google APIs, Firestore, a Pub/Sub topic with a push subscription, Cloud NAT to a payment provider, and Cloud Build, Artifact Registry and Cloud Deploy for releases.",
  "source": "gcp-cloud-run-microservices"
 },
 {
  "id": "google-cloud-event-driven-architecture-diagram",
  "title": "Google Cloud event-driven",
  "provider": "gcp",
  "img": "gcp-event-driven-functions",
  "w": 1400,
  "h": 769,
  "prompt": "Draw Google Cloud event-driven invoice processing with suppliers uploading to Cloud Storage, an Eventarc trigger to an extract Cloud Function using a Document AI processor and Firestore, a Pub/Sub topic with a BigQuery subscription and a dead-letter topic, a second Eventarc trigger to a validate function, a Workflows approval with a Cloud Run approvals app for the finance team, a Cloud NAT path to the ERP, and a nightly Cloud Scheduler job running a Cloud Run job.",
  "source": "gcp-event-driven-functions"
 },
 {
  "id": "google-cloud-streaming-bigquery-architecture-diagram",
  "title": "Google Cloud streaming analytics with BigQuery",
  "provider": "gcp",
  "img": "gcp-streaming-bigquery",
  "w": 1400,
  "h": 1376,
  "prompt": "Draw Google Cloud real-time game telemetry with a global external load balancer and Cloud Armor in front of a Cloud Run collector, a Pub/Sub topic with a dead-letter topic, a streaming Dataflow job in its own subnet writing to a BigQuery table and Bigtable and scoring with a Vertex AI endpoint, a leaderboard API on Cloud Run reading Bigtable, Looker dashboards for analysts, and Secret Manager and Cloud Monitoring as shared services.",
  "source": "gcp-streaming-bigquery"
 },
 {
  "id": "google-cloud-vertex-ai-mlops-architecture-diagram",
  "title": "Google Cloud Vertex AI MLOps",
  "provider": "gcp",
  "img": "gcp-vertex-mlops",
  "w": 1400,
  "h": 953,
  "prompt": "Draw Google Cloud Vertex AI MLOps with data scientists using Workbench through IAP, GitHub and a Cloud Build trigger building into Artifact Registry and starting Vertex AI Pipelines in a training subnet, BigQuery and Cloud Storage through a Private Service Connect Google APIs endpoint, the Model Registry, a Vertex AI endpoint behind a PSC address called by a Cloud Run claims app, a feature online store, BigQuery prediction logs, and a VPC Service Controls perimeter.",
  "source": "gcp-vertex-mlops"
 },
 {
  "id": "google-cloud-iot-telemetry-architecture-diagram",
  "title": "Google Cloud IoT telemetry",
  "provider": "gcp",
  "img": "gcp-iot-telemetry",
  "w": 1400,
  "h": 811,
  "prompt": "Draw Google Cloud IoT telemetry with line sensors and an edge gateway on a factory site, a passthrough network load balancer to MQTT broker VMs in two zones, CA Service device certificates, a Pub/Sub telemetry topic, a streaming Dataflow job writing to Bigtable and BigQuery and publishing anomalies, a Cloud Run maintenance service with Firestore work orders, Cloud NAT to PagerDuty, and Looker dashboards for plant engineers.",
  "source": "gcp-iot-telemetry"
 },
 {
  "id": "google-cloud-interconnect-hybrid-architecture-diagram",
  "title": "Google Cloud Interconnect hybrid network",
  "provider": "gcp",
  "img": "gcp-hybrid-interconnect",
  "w": 1400,
  "h": 1347,
  "prompt": "Draw a Google Cloud hybrid network with workstations, DNS and backup servers and edge routers in a corporate data centre, Dedicated Interconnect VLAN attachments in two edge availability domains to a Cloud Router, an HA VPN gateway with its own Cloud Router as backup, an ERP internal load balancer and VMs in two zones, Cloud SQL, a Cloud DNS inbound policy and forwarding zone, and a Private Service Connect endpoint to Cloud Storage.",
  "source": "gcp-hybrid-interconnect"
 },
 {
  "id": "google-cloud-multi-region-disaster-recovery-architecture-diagram",
  "title": "Google Cloud multi-region disaster recovery",
  "provider": "gcp",
  "img": "gcp-multi-region-dr",
  "w": 1400,
  "h": 1227,
  "prompt": "Draw a Google Cloud multi-region design in one global VPC with us-east1 and us-west1, a global external Application Load Balancer with Cloud Armor and serverless NEGs to Cloud Run web services in each region, Cloud Run workers and Memorystore per region, a Cloud SQL primary with a cross-region read replica, multi-region Firestore sessions, Pub/Sub, a dual-region Cloud Storage bucket, and an uptime check and alert policy starting a Workflows failover.",
  "source": "gcp-multi-region-dr"
 },
 {
  "id": "google-cloud-static-site-cicd-architecture-diagram",
  "title": "Google Cloud static website with CI/CD",
  "provider": "gcp",
  "img": "gcp-static-site-cicd",
  "w": 1400,
  "h": 1149,
  "prompt": "Draw a Google Cloud static website with Cloud DNS, a global external Application Load Balancer with a Certificate Manager certificate, a backend bucket with Cloud CDN for a Cloud Storage site bucket, a Cloud Armor protected Cloud Run API with Firestore, Identity Platform sign-in, Pub/Sub and a Cloud Function emailing contact forms, and GitHub with Cloud Build triggers publishing the site, preview builds, cache invalidation and Artifact Registry.",
  "source": "gcp-static-site-cicd"
 },
 {
  "id": "google-cloud-batch-hpc-architecture-diagram",
  "title": "Google Cloud Batch HPC",
  "provider": "gcp",
  "img": "gcp-batch-hpc",
  "w": 1400,
  "h": 1274,
  "prompt": "Draw Google Cloud Batch HPC for nightly Monte Carlo risk with Cloud Scheduler starting a Workflows run, a Batch job on Spot VMs across three zones in a Private Google Access subnet, Managed Lustre scratch, BigQuery market data exported to Cloud Storage scenarios and value-at-risk results in BigQuery, a Pub/Sub status topic, a Cloud Run risk portal, Looker reports, and Cloud Build with Artifact Registry for the engine image.",
  "source": "gcp-batch-hpc"
 },
 {
  "id": "google-cloud-saas-multi-tenant-architecture-diagram",
  "title": "Google Cloud SaaS multi-tenant",
  "provider": "gcp",
  "img": "gcp-saas-multi-tenant",
  "w": 1400,
  "h": 1063,
  "prompt": "Draw a Google Cloud multi-tenant SaaS with Identity Platform tenants, a global external load balancer with a Certificate Manager map and host rules, pooled and silo Cloud Run services with Direct VPC egress, AlloyDB with row-level security, a premium tenant project with Cloud SQL through Private Service Connect and a CMEK key, a Firestore tenant registry, a Pub/Sub onboarding service with a Cloud Build silo trigger, and usage metering into BigQuery.",
  "source": "gcp-saas-multi-tenant"
 },
 {
  "id": "google-cloud-payments-processing-architecture-diagram",
  "title": "Google Cloud payments processing",
  "provider": "gcp",
  "img": "gcp-payments-processing",
  "w": 1400,
  "h": 2215,
  "prompt": "Draw a Google Cloud PCI DSS payments platform with a global external load balancer and Cloud Armor in front of Apigee, Private Service Connect to an internal load balancer and a private GKE cluster in two zones, a Cloud SQL token vault with a Cloud HSM key, a Spanner ledger, Pub/Sub captures, a Cloud Run settlement job writing to a locked audit bucket, Cloud NAT to the card networks, and Binary Authorization and VPC Service Controls as shared services.",
  "source": "gcp-payments-processing"
 },
 {
  "id": "google-cloud-security-command-center-architecture-diagram",
  "title": "Google Cloud Security Command Center",
  "provider": "gcp",
  "img": "gcp-security-command-center",
  "w": 1400,
  "h": 1660,
  "prompt": "Draw Google Cloud security operations with a workload project holding web VMs in two zones behind Cloud NGFW Enterprise and Cloud NAT, and a security project with an organisation log sink, a log bucket linked to BigQuery, a log-based metric and alert policy notifying SOC analysts, Security Command Center notifications to Pub/Sub triggering a remediation Cloud Function, a Cloud Asset feed for IAM changes, and Sensitive Data Protection scanning a bucket.",
  "source": "gcp-security-command-center"
 },
 {
  "id": "google-cloud-video-processing-architecture-diagram",
  "title": "Google Cloud video processing",
  "provider": "gcp",
  "img": "gcp-media-processing",
  "w": 1400,
  "h": 1599,
  "prompt": "Draw Google Cloud video processing with creators signing in with Identity Platform and uploading to Cloud Storage with a signed URL from a Cloud Run studio API, Eventarc starting a Workflows run with a Transcoder API job and template, Pub/Sub job events, a Cloud Run thumbnails job, a Firestore catalogue, Cloud DNS and a global load balancer with Cloud CDN for renditions and a Cloud Run catalogue API, and watch events into BigQuery.",
  "source": "gcp-media-processing"
 },
 {
  "id": "google-cloud-vm-three-tier-migration-architecture-diagram",
  "title": "Google Cloud VM three-tier migration",
  "provider": "gcp",
  "img": "gcp-vm-three-tier-migrate",
  "w": 1400,
  "h": 758,
  "prompt": "Draw a Google Cloud three-tier VM migration with web and app VMs and MySQL in a corporate data centre connected by HA VPN, Migrate to Virtual Machines images and instance templates, Database Migration Service to Cloud SQL for MySQL HA, a global external load balancer with Cloud Armor to a web managed instance group in two zones, an internal load balancer to an app managed instance group, Filestore shared content, and Cloud NAT to a payment provider.",
  "source": "gcp-vm-three-tier-migrate"
 }
];
