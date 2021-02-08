# Chatbot Instructions
*This are the details to deploy the chatbot used by the "Customer Persona" to place orders* 

## Bot Deployment
### Step 1
Fork the smb-eat-bot from this [SAP Conversational AI Repo](https://cai.tools.sap/yatseali/smb-eats-assistant).
 
### Step 2
Update the **smb-eat call url** in the skill on hte following actions:
* place-order
* checkout place-order > requirement > product > 
  * https://[Your APP host]>/api/items
* check-out > action >
  * https://[Your APP host]/api/item/{​​​​​​​{​​​​​​​json memory.cart_list[0].product}​​​​​​}​​​​​​
* Start
  * https://[Your APP host]/api/start

### Step 3
Connect your bot to a range of channel, such web chat, slack, ms teams, messenger etc, just select the target channel, and follow the wizard in the connect page.
 
## Bot Configuration
### Step 1
Train the bot to understand your customer products instead of pizza.
1.Prepare a csv with format as below:
expression;language

MyProduct1;en

MyProduct2;en
....
### Step 2 
Import the csv through edit the intent product and import csv.
After the custom product imported, please label the custom product as entity PRODUCT
 
### Step 3
Assure the api/items in the backend will return the same product name as the training product above.
