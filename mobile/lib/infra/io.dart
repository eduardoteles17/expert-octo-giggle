import 'package:socket_io_client/socket_io_client.dart' as IO;

const isProduction = bool.fromEnvironment('dart.vm.product');

final socket = IO.io(
  isProduction
      ? 'https://smart-lamp-api.eduardoteles.cloud'
      : 'https://reindeer-absolute-escargot.ngrok-free.app',
  IO.OptionBuilder()
      .setTransports(['websocket'])
      .build(),
);
