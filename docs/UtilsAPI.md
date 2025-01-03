## Classes

<dl>
<dt><a href="#AuthService">AuthService</a></dt>
<dd></dd>
<dt><a href="#AuthService">AuthService</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#os">os</a></dt>
<dd><p>Used for reading system information</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#readFolder">readFolder(dir)</a> <code>Promise.&lt;Array.&lt;string&gt;&gt;</code></dt>
<dd><p>Reads the contents of a directory (folder) and returns an array of filenames.</p>
</dd>
<dt><a href="#findTemperatureFiles">findTemperatureFiles(dirContents)</a> <code>Array.&lt;{LABEL: string}&gt;</code></dt>
<dd><p>Finds the temperature files within the temperature directory.</p>
</dd>
<dt><a href="#findMotherboardFiles">findMotherboardFiles(dirContents)</a> <code>Array.&lt;{LABEL: string}&gt;</code></dt>
<dd><p>Finds motherboard files worth reading (voltages and fans) within the array.</p>
</dd>
<dt><a href="#findValues">findValues(dir, label)</a> <code><a href="#LabeledValue">Promise.&lt;LabeledValue&gt;</a></code></dt>
<dd><p>Reads the file corresponding to the given label in the specified directory 
and returns the label/value pair.</p>
</dd>
<dt><a href="#getCurrentMemory">getCurrentMemory()</a> <code>Number</code></dt>
<dd><p>Gets the free memory (unused) on the system in bytes</p>
</dd>
<dt><a href="#getTotalMemory">getTotalMemory()</a> <code>Number</code></dt>
<dd><p>Gets total memory on the system</p>
</dd>
<dt><a href="#getUptime">getUptime()</a> <code>Array</code></dt>
<dd><p>Gets uptime in Milliseconds</p>
</dd>
<dt><a href="#bytesToGb">bytesToGb(memInBytes)</a> <code>Number</code></dt>
<dd><p>Converts Memory in bytes to gigabytes</p>
</dd>
<dt><a href="#splitUptime">splitUptime(uptime)</a> <code>Array</code></dt>
<dd><p>Splits uptime MS into Days, Hours, Minutes, Seconds</p>
</dd>
<dt><a href="#getLoadAvg">getLoadAvg()</a> <code>Array</code></dt>
<dd><p>Gets load average array from node:os ONLY ON UNIX</p>
</dd>
<dt><a href="#convert">convert(data)</a> <code>Array.&lt;Object&gt;</code></dt>
<dd><p>Converts Milli readings values to base 10</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ValidateUserResult">ValidateUserResult</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#LabeledValue">LabeledValue</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="AuthService"></a>

## AuthService
**Kind**: global class  

* [AuthService](#AuthService)
    * [new AuthService()](#new_AuthService_new)
    * [new AuthService(uri, [options])](#new_AuthService_new)
    * [.connect()](#AuthService+connect)  <code>Promise.&lt;void&gt;</code>
    * [.validateUser(USERNAME, password)](#AuthService+validateUser)  [<code>Promise.&lt;ValidateUserResult&gt;</code>](#ValidateUserResult)
    * [.close()](#AuthService+close)  <code>Promise.&lt;void&gt;</code>

<a name="new_AuthService_new"></a>

### new AuthService()
Connects, Validates, and Closes MongoDB database of users.

<a name="new_AuthService_new"></a>

### new AuthService(uri, [options])
Creates an instance of AuthService.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| uri | <code>string</code> |  | The MongoDB connection URI. |
| [options] | <code>Object</code> | <code>{}</code> | Additional MongoDB client options (e.g., TLS config). |

**Example**  
```js
const uri = 'mongodb://myMongoHost:27017/?authMechanism=MONGODB-X509';
const options = {
  tls: true,
  tlsCertificateKeyFile: '/path/to/client.pem',
  tlsCAFile: '/path/to/ca.pem'
};
const authService = new AuthService(uri, options);
```
<a name="AuthService+connect"></a>

### authService.connect()  <code>Promise.&lt;void&gt;</code>
Connects to MongoDB and instantiates a client for use.

**Kind**: instance method of [<code>AuthService</code>](#AuthService)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Resolves on successful connection.  
**Throws**:

- <code>Error</code> If the connection fails.

**Example**  
```js
await authService.connect();
```
<a name="AuthService+validateUser"></a>

### authService.validateUser(USERNAME, password)  [<code>Promise.&lt;ValidateUserResult&gt;</code>](#ValidateUserResult)
Validates a user within the database using the stored credentials.
You must call [connect](#AuthService+connect) first or `this.db` will be `null`.

**Kind**: instance method of [<code>AuthService</code>](#AuthService)  
**Returns**: [<code>Promise.&lt;ValidateUserResult&gt;</code>](#ValidateUserResult) - An object with the validation result, plus a reason or user.  
**Throws**:

- <code>Error</code> If no client is connected.


| Param | Type | Description |
| --- | --- | --- |
| USERNAME | <code>string</code> | The username to look up in the database. |
| password | <code>string</code> | The plaintext password (or hashed password in a real system). |

**Example**  
```js
const result = await authService.validateUser("alice", "securePassword");
if (result.valid) {
  console.log("User is valid:", result.user);
} else {
  console.log("Validation failed:", result.reason);
}
```
<a name="AuthService+close"></a>

### authService.close()  <code>Promise.&lt;void&gt;</code>
Closes the database session. THIS IS NECESSARY!
Otherwise, the client will leave unclosed sessions on the server.

**Kind**: instance method of [<code>AuthService</code>](#AuthService)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Resolves when the session has closed.  
**Example**  
```js
await authService.close();
```
<a name="AuthService"></a>

## AuthService
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| uri | <code>string</code> | The MongoDB URI stored for later connection. |
| options | <code>Object</code> | Configuration object for TLS, timeouts, etc. |
| client | <code>MongoClient</code> | The MongoDB client instance (once connected). |
| db | <code>Object</code> | The connected MongoDB database instance. |


* [AuthService](#AuthService)
    * [new AuthService()](#new_AuthService_new)
    * [new AuthService(uri, [options])](#new_AuthService_new)
    * [.connect()](#AuthService+connect)  <code>Promise.&lt;void&gt;</code>
    * [.validateUser(USERNAME, password)](#AuthService+validateUser)  [<code>Promise.&lt;ValidateUserResult&gt;</code>](#ValidateUserResult)
    * [.close()](#AuthService+close)  <code>Promise.&lt;void&gt;</code>

<a name="new_AuthService_new"></a>

### new AuthService()
Connects, Validates, and Closes MongoDB database of users.

<a name="new_AuthService_new"></a>

### new AuthService(uri, [options])
Creates an instance of AuthService.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| uri | <code>string</code> |  | The MongoDB connection URI. |
| [options] | <code>Object</code> | <code>{}</code> | Additional MongoDB client options (e.g., TLS config). |

**Example**  
```js
const uri = 'mongodb://myMongoHost:27017/?authMechanism=MONGODB-X509';
const options = {
  tls: true,
  tlsCertificateKeyFile: '/path/to/client.pem',
  tlsCAFile: '/path/to/ca.pem'
};
const authService = new AuthService(uri, options);
```
<a name="AuthService+connect"></a>

### authService.connect()  <code>Promise.&lt;void&gt;</code>
Connects to MongoDB and instantiates a client for use.

**Kind**: instance method of [<code>AuthService</code>](#AuthService)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Resolves on successful connection.  
**Throws**:

- <code>Error</code> If the connection fails.

**Example**  
```js
await authService.connect();
```
<a name="AuthService+validateUser"></a>

### authService.validateUser(USERNAME, password)  [<code>Promise.&lt;ValidateUserResult&gt;</code>](#ValidateUserResult)
Validates a user within the database using the stored credentials.
You must call [connect](#AuthService+connect) first or `this.db` will be `null`.

**Kind**: instance method of [<code>AuthService</code>](#AuthService)  
**Returns**: [<code>Promise.&lt;ValidateUserResult&gt;</code>](#ValidateUserResult) - An object with the validation result, plus a reason or user.  
**Throws**:

- <code>Error</code> If no client is connected.


| Param | Type | Description |
| --- | --- | --- |
| USERNAME | <code>string</code> | The username to look up in the database. |
| password | <code>string</code> | The plaintext password (or hashed password in a real system). |

**Example**  
```js
const result = await authService.validateUser("alice", "securePassword");
if (result.valid) {
  console.log("User is valid:", result.user);
} else {
  console.log("Validation failed:", result.reason);
}
```
<a name="AuthService+close"></a>

### authService.close()  <code>Promise.&lt;void&gt;</code>
Closes the database session. THIS IS NECESSARY!
Otherwise, the client will leave unclosed sessions on the server.

**Kind**: instance method of [<code>AuthService</code>](#AuthService)  
**Returns**: <code>Promise.&lt;void&gt;</code> - Resolves when the session has closed.  
**Example**  
```js
await authService.close();
```
<a name="os"></a>

## os
Used for reading system information

**Kind**: global constant  
<a name="readFolder"></a>

## readFolder(dir)  <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
Reads the contents of a directory (folder) and returns an array of filenames.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> - A promise that resolves to an array of filenames.  

| Param | Type | Description |
| --- | --- | --- |
| dir | <code>string</code> | A file path to the directory to read. |

<a name="findTemperatureFiles"></a>

## findTemperatureFiles(dirContents)  <code>Array.&lt;{LABEL: string}&gt;</code>
Finds the temperature files within the temperature directory.

**Kind**: global function  
**Returns**: <code>Array.&lt;{LABEL: string}&gt;</code> - An array of objects, each containing a `LABEL` property.  

| Param | Type | Description |
| --- | --- | --- |
| dirContents | <code>Array.&lt;string&gt;</code> | An array of filenames in the temperature directory. |

<a name="findMotherboardFiles"></a>

## findMotherboardFiles(dirContents)  <code>Array.&lt;{LABEL: string}&gt;</code>
Finds motherboard files worth reading (voltages and fans) within the array.

**Kind**: global function  
**Returns**: <code>Array.&lt;{LABEL: string}&gt;</code> - An array of objects, each containing a `LABEL` property.  

| Param | Type | Description |
| --- | --- | --- |
| dirContents | <code>Array.&lt;string&gt;</code> | An array of filenames in the motherboard directory. |

<a name="findValues"></a>

## findValues(dir, label)  [<code>Promise.&lt;LabeledValue&gt;</code>](#LabeledValue)
Reads the file corresponding to the given label in the specified directory 
and returns the label/value pair.

**Kind**: global function  
**Returns**: [<code>Promise.&lt;LabeledValue&gt;</code>](#LabeledValue) - Promise resolving to an object with label and value.  

| Param | Type | Description |
| --- | --- | --- |
| dir | <code>string</code> | A file path to the directory that contains the file. |
| label | <code>string</code> | Name of the file to read. |

<a name="getCurrentMemory"></a>

## getCurrentMemory()  <code>Number</code>
Gets the free memory (unused) on the system in bytes

**Kind**: global function  
**Returns**: <code>Number</code> - - Free memory in bytes  
<a name="getTotalMemory"></a>

## getTotalMemory()  <code>Number</code>
Gets total memory on the system

**Kind**: global function  
**Returns**: <code>Number</code> - - Total Memory on the system  
<a name="getUptime"></a>

## getUptime()  <code>Array</code>
Gets uptime in Milliseconds

**Kind**: global function  
**Returns**: <code>Array</code> - - Uptime Averages  
<a name="bytesToGb"></a>

## bytesToGb(memInBytes)  <code>Number</code>
Converts Memory in bytes to gigabytes

**Kind**: global function  
**Returns**: <code>Number</code> - - Memory in Gigabytes  

| Param | Type | Description |
| --- | --- | --- |
| memInBytes | <code>Number</code> | Memory in bytes |

<a name="splitUptime"></a>

## splitUptime(uptime)  <code>Array</code>
Splits uptime MS into Days, Hours, Minutes, Seconds

**Kind**: global function  
**Returns**: <code>Array</code> - - [Days, Hours, Minutes, Seconds]  

| Param | Type | Description |
| --- | --- | --- |
| uptime | <code>Number</code> | Uptime in Milliseconds |

<a name="getLoadAvg"></a>

## getLoadAvg()  <code>Array</code>
Gets load average array from node:os ONLY ON UNIX

**Kind**: global function  
**Returns**: <code>Array</code> - - [1 Minute, 5 Minute, 15 Minute] Load Averages  
<a name="convert"></a>

## convert(data)  <code>Array.&lt;Object&gt;</code>
Converts Milli readings values to base 10

**Kind**: global function  
**Returns**: <code>Array.&lt;Object&gt;</code> - - Returns new object array with converted readings values  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array.&lt;Object&gt;</code> | Object array of readings names and values |

<a name="ValidateUserResult"></a>

## ValidateUserResult : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| valid | <code>boolean</code> | Whether the credentials are valid. |
| [reason] | <code>string</code> | The reason for a failed validation. |
| [user] | <code>Object</code> | The user object from MongoDB, if validation is successful. |

<a name="LabeledValue"></a>

## LabeledValue : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| LABEL | <code>string</code> | The name of the file read |
| VALUE | <code>string</code> | The trimmed file data |

