variable "crlsn_domain" {
	default = "crlsn.io"
}

variable "size" {
	default = "512mb"
}

variable "dnsimple_token" {
	default = "CWA9x2DsYNyugZmGceC8gZCarWhMpMl0"
}

variable "dnsimple_email" {
	default = "nathan.s.carlson@gmail.com"
}

provider "dnsimple" {
	token = "${var.dnsimple_token}"
	email = "${var.dnsimple_email}"
}

resource "dnsimple_record" "crlsn" {
	domain = "${var.crlsn}"
	name = ""

	# verify in terraform's digitalocean plugin documentation
	value = "${digitalocean_droplet.www-1.ipv4_address}"
	type = "A"
	ttl = 30
}

resource "dnsimple_record" "www-crlsn" {
	domain = "${var.crlsn}"
	name = "www"

	# verify in terraform's digitalocean plugin documentation
	value = "crlsn.io"
	type = "CNAME"
	ttl = 30
}

resource "digitalocean_droplet" "api-1" {
	image = "docker"
	name = "crlsn-api-1"
	region = "nyc2"
	size = "${var.size}"
	ssh_keys = ["66:72:82:69:83:20:ff:c3:43:cb:9b:2b:ff:4f:fb:9f"]
	private_networking = true
	provider = "digitalocean"

	count = "1"

	connection {
		user = "root"
		key_file = "${var.ssh_key_path}"
		timeout = "2m"
	}

	provisioner "file" {
		source = "../docker-compose.yml"
		destination = "/tmp/docker-compose.yml"
	}

  provisioner "remote-exec" {
		inline = [
		"apt-get -y install python-pip",
		"pip install docker-compose",
		"cd /tmp",
		"docker-compose up -d"
		]
	}
}
