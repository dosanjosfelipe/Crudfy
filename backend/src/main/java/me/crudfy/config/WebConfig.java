package me.crudfy.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowCredentials(true)
                .allowedHeaders("Content-Type", "Origin")
                .allowedMethods("POST", "GET", "OPTIONS", "PATCH", "DELETE")
                .allowedOrigins("http://localhost:8080/")
                .maxAge(3600L);
    }
}
