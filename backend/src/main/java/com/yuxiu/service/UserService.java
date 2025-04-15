package com.yuxiu.service;

import com.yuxiu.entity.User;

public interface UserService {
    User register(User user);
    User findByEmail(String email);
    User findById(Long id);
    void updateUser(User user);
} 