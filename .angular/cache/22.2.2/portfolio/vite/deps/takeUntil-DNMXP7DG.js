import { Da as noop, Sa as operate, xa as createOperatorSubscriber } from "./_resource-chunk-Da7hkGgl.js";
import { t as innerFrom } from "./innerFrom-CU0UicYU.js";
//#region ../node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js
function takeUntil(notifier) {
	return operate(function(source, subscriber) {
		innerFrom(notifier).subscribe(createOperatorSubscriber(subscriber, function() {
			return subscriber.complete();
		}, noop));
		!subscriber.closed && source.subscribe(subscriber);
	});
}
//#endregion
export { takeUntil as t };
