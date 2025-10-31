# Form-A
### Yes, I agree, it's a rather ill-considered name :).
Simple form generator based on vite & vue
was originally created as a tool to facilitate the creation of WordPress admin pages, and then we'll see

#### Made for my own needs (and yes, it satisfies them). If this project in whole or in part it can be useful to someone, you are welcome

## Usage: 

### HTML ( please refer to [index.html](./index.html) )
(class "form-a-placeholder" is required).  You can place multiple forms

```
    <form>
      <div id="local-form-1" class="form-a-placeholder">
      </div>
    </form>
```

### Form loading ( please refer to [remote.js](./src/remote.js) )

window.formA must exists and have 2 props: 
"remote"  that contain endpoint url and , in my case, wordpress nonce
and 
"forms"

```
const  formA = window.formA ??  { 
    remote: {
        nonce: "25e94a50ff",
        url: "https://localhost/end/point/url"
    },
    forms : {
        ..........
    }
}

```

#### Option 1  (refer to 'local-form-...'  in [remote.js](./src/remote.js) )
In this case form definition is in window.formA.forms

```
...
    forms : {
        'local-form-slug' : {
            def: {
                // definition
            }, 
            data: {
                // prefil data
            }
        }
    }
....    

```

#### Option 2  (refer to 'remote-form'  in [remote.js](./src/remote.js) )
In this case form definition will load from backend

```
....
    forms : {
        'remote-form-slug' : {
            remoteLoad: true
        }
    }
....

```

### Form Definition
 please refer to [demo.js](./src/demo.js)  for full example
```
forms: {
        'local-form-1': {     // placeholder id 
            data: {
                // data for form prefill, may be empty 
            },
            def: {
                title: 'Plain Form',
                remoteSubmit: true,   // i mean "ajax submit" :)
                buttons: [    // one button implemented at the moment
                    {
                        text: 'Submit',
                        classes: ['button', 'button-primary','button-large'],
                        type: 'submit'
                    }
                ],    
                fields: [
                    {
                        type: 'text',  //  email |  password |  number | textarea
                        name: 'text-field',
                        label: 'Text Field',   // short form  default position  - "before"
                        default: 'Text Value',
                        classes: ['col-2'],  //  grid of 18 columns and other classes by your taste
                        breakAfter: false , //  "true" for new line 
                        validators: {
                            required: true   // at the moment only "required" implemented
                        }
                    },
                    // next field
                ]
            }
        }
    }    
```

### Submit options
#### Option1 
```
         ....
            def: {
                remoteSubmit: true,   // ajax POST submit to remote URL
        ....

```    
#### Option 2
```
         ....
            def: {
                remoteSubmit: false,   // POST with page reload (not tested properly at the moment )
        ....

```    




