#!/usr/bin/env sh

terraform plan -var "do_token=${DO_TOKEN}" -var "ssh_key_path=${DO_SSH_PATH}"
