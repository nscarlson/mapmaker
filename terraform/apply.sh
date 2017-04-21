#!/usr/bin/env sh

terraform apply "$@" -var "do_token=${DO_TOKEN}" -var "ssh_key_path=${SSH_KEY_PATH}"
