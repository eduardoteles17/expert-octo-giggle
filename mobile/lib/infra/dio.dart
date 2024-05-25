import 'package:dio/dio.dart';

const isProduction = bool.fromEnvironment('dart.vm.product');

final dio = Dio(BaseOptions(
  baseUrl: isProduction
      ? 'https://smart-lamp-production.up.railway.app'
      : 'https://reindeer-absolute-escargot.ngrok-free.app',
));
