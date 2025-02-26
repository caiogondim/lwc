import { registerDecorators as _registerDecorators, registerComponent as _registerComponent } from "lwc";
import _tmpl from "./test.html";
import { getFoo } from "data-service";

class Test {
  wiredProp;
}

_registerDecorators(Test, {
  wire: {
    wiredProp: {
      adapter: getFoo,
      dynamic: [],
      config: function ($cmp) {
        return {};
      }
    }
  }
});

export default _registerComponent(Test, {
  tmpl: _tmpl
});