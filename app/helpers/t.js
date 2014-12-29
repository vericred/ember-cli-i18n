import Stream from 'ember-cli-i18n/utils/stream';

export default function tHelper(params, hash, options, env) {
  var path = params.shift();

  var container = this.container;
  var t = container.lookup('utils:t');
  var types = options.types;

  // parse input params and streamify
  for (var i = 0, l = args.length; i < l; i++) {
    // (starting at 1 because we popped path off already
    if (types[i + 1] === 'ID') {
      args[i] = view.getStream(args[i]);
    }
  }

  // convert path into a stream
  if (types[0] === 'ID') {
    path = view.getStream(path);
  }

  var stream = new Stream(function() {
    return t(path, params);
  });

  // bind any arguments that are Streams
  for (var i = 0, l = params.length; i < l; i++) {
    var param = params[i];
    if(param && param.isStream){
      param.subscribe(stream.notify, stream);
    }
  }

  container.localeStream.subscribe(stream.notify, stream);

  if (path.isStream) {
    path.subscribe(stream.notify, stream);
  }

  return stream;
}
