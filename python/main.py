import httplib, urllib
from cookielib import CookieJar, DefaultCookiePolicy

HOSTNAME = ENV['PY_HOST']
USERNAME = ENV['PY_USER']
PASSWORD = ENV['PY_PASS']

_cookieJar = CookieJar()

def  getIndex(url):
	print "WHA? ", url, HOSTNAME


def login(url, username, password):
	headers = {"Accept":"text/html",
	"Content-Type":"application/x-www-form-urlencoded",
	"User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64)"}
	body=urllib.urlencode({"player":username,"password":password, "btnLogin":"Login"})
	conn = httplib.HTTPConnection(url)
	conn.set_debuglevel(1)
	conn.request("POST","/authenticate.php",body,headers)
	response = conn.getresponse()
	print response.msg, response.getheaders(), response.reason, response.status
	page = response.read()
	print "page length ", len(page)
	if not USERNAME in page:
		print "NOT LOGGED IN"
		print page


# conn = httplib.HTTPConnection("www.torn.com")
# conn.request("GET", "/login.php")
# r1 = conn.getresponse()
# print r1.status, r1.reason
# data1 = r1.read()
# print len(data1)
def main():
	getIndex(HOSTNAME)
	login(HOSTNAME,USERNAME,PASSWORD)

if __name__ == "__main__":
  main()
