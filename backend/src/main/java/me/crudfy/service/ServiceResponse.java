package me.crudfy.service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ServiceResponse {

    private boolean success;
    private String message;
}
