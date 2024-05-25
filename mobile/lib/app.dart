import 'package:flutter/material.dart';
import 'package:mobile/screens/splash_screen.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Smart Lamp',
      theme: ThemeData(
        useMaterial3: true,
      ),
        home: SplashScreen(),
    );
  }
}
