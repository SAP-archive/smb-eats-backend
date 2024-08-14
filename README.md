# Deprecation Notice

This public repository is read-only and no longer maintained.

![](https://img.shields.io/badge/STATUS-NOT%20CURRENTLY%20MAINTAINED-red.svg?longCache=true&style=flat)

---

[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/smb-eats-backend)](https://api.reuse.software/info/github.com/SAP-samples/smb-eats-backend)
[![License: Apache2](https://img.shields.io/badge/License-Apache2-green.svg)](https://opensource.org/licenses/Apache-2.0)
![CI](https://github.com/SAP-samples/smb-eats-backend/workflows/CI/badge.svg)
# smb-eats

[![](https://i.imgur.com/ElLTgfZ.png "launch live demo")](https://smb-eats.cfapps.eu10.hana.ondemand.com)


## Description
This is a sample application to demonstrate how partners can created solutions that leverage several the [SAP Business Technology Platform](https://www.sap.com/products/business-technology-platform.html) to create integrations and extensions to business applications (in this case SAP Business ByDesign).

It implements an end-to-end process of Food Ordering solution, from customer ordering to the delivery confirmation. Such process is handled by the [Workflow Management Service](https://discovery-center.cloud.sap/serviceCatalog/workflow-management).

![worfklow process](https://i.imgur.com/mouLjiT.png "Workflow process on the Business Application Studio")

The process starts with the "customer persona" that places an order using a Chatbot created with [SAP Conversational AI](https://cai.tools.sap/).

"Restaurant employees" (i.e. Agent, Kitchen, Rider) interact with the workflow tasks via a custom application (this repository) that consume the [Workflow APIs](https://help.sap.com/viewer/e157c391253b4ecd93647bf232d18a83/Cloud/en-US/df943e71122448caaf3c49f5ffd80627.html).

In between assigning tasks, the Workflow is also making request to the [Integration Suite](https://discovery-center.cloud.sap/serviceCatalog/integration-suite). This will handle requests to SAP Business ByDesign in order to create sales orders, outbound deliveries and customer invoices accordingly.

Once the delivery is confirmed and the process is finished, the customer receives a [Qualtrics Survey](https://discovery-center.cloud.sap/serviceCatalog/integration-suite) to evaluate the experience.

🔴 [Live Demo](https://smb-eats.cfapps.eu10.hana.ondemand.com/)

📄 [Blog with details](https://blogs.sap.com/2021/02/05/sap-workflow-management-and-loosely-coupled-architecture/)


## Requirements
* [Free Trial Account](https://developers.sap.com/tutorials/hcp-create-trial-account.html)
* [Install the Cloud Foundry CLI](https://developers.sap.com/tutorials/cp-cf-download-cli.html)
* [smb-eats-integration deployed](https://github.com/SAP-samples/smb-eats-integration)
* [The Service Key Details](https://help.sap.com/viewer/e157c391253b4ecd93647bf232d18a83/Cloud/en-US/e8d88dd056f14c75af59e68d6b20345f.html#loioe8d88dd056f14c75af59e68d6b20345f__create_service_key) of your workflow instance


## Deployment
Clone this repository
```sh
git clone https://github.com/SAP-Samples/smb-eats-backend.git
```
From the root directory, using the [Cloud Foundry CLI](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html) push your app to the SAP CP Cloud Foundry
```sh
cf push --random-route
```
Allow your worfklow instance, created during the deployment of the [smb-eats-integration](https://github.com/SAP-samples/smb-eats-integration), to expose APIs on needed scopes running the following command:
```sh
cf update-service <WF INSTANCE NAME> -c '{"authorities": ["WORKFLOW_DEFINITION_GET", "WORKFLOW_INSTANCE_START", "WORKFLOW_INSTANCE_GET", "TASK_GET", "TASK_GET_CONTEXT", "TASK_COMPLETE", "TASK_UPDATE"]}'
```
*This will allow the backend application to consume [Workflow APIs](https://api.sap.com/api/SAP_CP_Workflow_CF/resource)*

Then set the Environment Variables accordingly
```sh
cf set-env smb-eats ACTIVITY_KITCHEN <Workflow Task ID for Kitchen>
cf set-env smb-eats ACTIVITY_DELIVERY <Workflow Task ID for Delivery>
cf set-env smb-eats AUTH_URL <User authentical URL as shown on the Workflow instance secret key>
cf set-env smb-eats AUTH_CLIENT_ID '<Client ID as on on the Workflow instance secret key>'
cf set-env smb-eats AUTH_CLIENT_SECRET '<Client Secret>'
cf set-env smb-eats WF_REST_URL <Workflow REST API URL>
cf set-env smb-eats WF_DEFINITION <Workflow Definition ID>
cf set-env smb-eats GMAPS_API_KEY  <Google Maps Places API Key> //Optional
```
**Example**
```sh
cf set-env smb-eats ACTIVITY_KITCHEN usertask4
cf set-env smb-eats ACTIVITY_DELIVERY usertask5
cf set-env smb-eats AUTH_URL https://12312dstrial.authentication.eu10.hana.ondemand.com
cf set-env smb-eats AUTH_CLIENT_ID 'sb-clone-safasf-f519-asfsa-b3f2-asfsafc!b58935|workflow!b10150'
cf set-env smb-eats AUTH_CLIENT_SECRET '1231231-da64-123123-12412-1231231$s8uRBo-121123123-6-Go='
cf set-env smb-eats WF_REST_URL https://api.workflow-sap.cfapps.eu10.hana.ondemand.com/workflow-service/rest
cf set-env smb-eats WF_DEFINITION smbeats
```
Restart your application (so it can read the new environment variables)
```sh
cf restart smb-eats
```

For the chatbot deployment [check chatbot-readme](chatbot-readme.md)

## Support and Contributions
This repository is provided "as-is". No support is available. Feel free to open issues or provide pull requests.

## License
Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSES/Apache-2.0.txt) file.
