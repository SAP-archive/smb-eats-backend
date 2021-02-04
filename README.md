![CI](https://github.com/SAP-samples/smb-eats-backend/workflows/CI/badge.svg)
# smb-eats

[![](https://i.imgur.com/ElLTgfZ.png "app front page")](https://smb-eats.cfapps.eu10.hana.ondemand.com)


## Description
This is a sample application to demonstrate how partners can created solutions that leverage several the [SAP Business Technology Platform](https://www.sap.com/products/business-technology-platform.html) to create integrations and extensions to business applications (in this case SAP Business ByDesign)

It implements an End-to-end process of Food Ordering solution, from customer ordering to the delivery confirmation. Such process is handled by the [Workflow Management Service](https://discovery-center.cloud.sap/serviceCatalog/workflow-management)

![worfklow process](https://i.imgur.com/o6mk8oQ.png "Workflow process on the Business Application Studio")

The process starts with the "customer persona" that places an order using a Chatbot created with [SAP Conversational AI](https://cai.tools.sap/)

"Restaurant employees" (i.e. Agent, Kitchen, Rider) interact with the workflow tasks via a custom application (this repository) that consume the [Workflow APIs](https://help.sap.com/viewer/e157c391253b4ecd93647bf232d18a83/Cloud/en-US/df943e71122448caaf3c49f5ffd80627.html)

In between assigning tasks, the Workflow is also making request to the [Integration Suite](https://discovery-center.cloud.sap/serviceCatalog/integration-suite). This will handle requests to SAP Business ByDesign in order to create sales orders, outbound deliveries and customer invoices accordingly.

Once the delivery is confirmed and the process is finished, the customer receives a [Qualtrics Survey](https://discovery-center.cloud.sap/serviceCatalog/integration-suite) to evaluate the experience.


## Requirements


## Download and Installation
cf services 
cf update-service wm_workflow -c '{"authorities": ["WORKFLOW_DEFINITION_GET", "WORKFLOW_INSTANCE_START", "WORKFLOW_INSTANCE_GET", "TASK_GET", "TASK_GET_CONTEXT", "TASK_COMPLETE", "TASK_UPDATE"]}'
## Known Issues

## How to obtain support

## Contributing

## License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSES/Apache-2.0.txt) file.
