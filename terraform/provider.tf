provider "digitalocean" {
	token = "${var.do_token}"
}

variable "domain" {
	default = "timefilter.io"
}

variable "ssh_key_id" {
	default = "66:72:82:69:83:20:ff:c3:43:cb:9b:2b:ff:4f:fb:9f"
}

variable "do_token" {}
variable "ssh_key_path" {}

variable "size" {
	default = "512mb"
}
