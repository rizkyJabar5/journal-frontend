// // Shim to avoid calling ReactDOM.findDOMNode which is deprecated in React 18+.
// // This returns the DOM node when possible, otherwise null.
// export default function findDOMNode(node) {
//   try {
//     if (!node) return null;
//     // Support nativeElement wrappers
//     if (typeof node === 'object') {
//       if (node.nativeElement && (node.nativeElement instanceof HTMLElement || node.nativeElement instanceof SVGElement)) {
//         return node.nativeElement;
//       }
//       if (node instanceof HTMLElement || node instanceof SVGElement) {
//         return node;
//       }
//     }
//     return null;
//   } catch (e) {
//     return null;
//   }
// }
