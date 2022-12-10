# Form-A
### Yes, I agree, it's a rather ill-considered name :).
Simple form generator based on vite & vue
was originally created as a tool to facilitate the creation of WordPress admin pages, and then we'll see

#### Made for my own needs (and yes, he satisfies them). If in whole or in part it can be useful to someone, you are welcome

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

#### Option 1  (refer to 'local-form-...'  in remote.js)
In this case form definition placed in window.formA.forms
#### Option 2  (refer to 'remote-form'  in remote.js)
In this case form definition loaded from backend



