output "www-ip" {
    value = "${digitalocean_droplet.www-1.ipv4_address}"
}

