import 'package:flutter/material.dart';
import 'package:local_auth/local_auth.dart';
import 'package:lottie/lottie.dart';

import 'home_screen.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  final LocalAuthentication auth = LocalAuthentication();

  _navegarHome() {
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(
        builder: (context) => const HomeScreen(),
      ),
    );
  }

  _initApp() async {
    await Future.delayed(const Duration(seconds: 3));
    final bool canAuthenticateWithBiometrics = await auth.canCheckBiometrics;
    final bool canAuthenticate =
        canAuthenticateWithBiometrics || await auth.isDeviceSupported();

    if (mounted && !canAuthenticate) {
      _navegarHome();
    }

    if (mounted && canAuthenticate) {
      try {
        final isAuthenticated = await auth.authenticate(
          localizedReason: 'Autentique-se para acessar o aplicativo',
          options: const AuthenticationOptions(
            stickyAuth: true,
            sensitiveTransaction: true,
          ),
        );

        if (isAuthenticated) {
          _navegarHome();
        }
      } catch (e) {
        _navegarHome();
      }
    }
  }

  @override
  void initState() {
    super.initState();
    _initApp();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Lottie.asset(
          'assets/lottie/splash-screen.json',
          width: 224,
          height: 224,
          fit: BoxFit.fill,
        ),
      ),
    );
  }
}
