

**Sleeping Server** is a kind of joke app which however can - in some cases - also help with some serious tests ;) 



### Usage

There is one API method which can take one parameter:

```
http(s)://sleeping.server.org/:sleepValue
```

Where `:sleepValue` is the delay value after which the server sends a response.

The **delay value** is calculates as the `:sleepValue` times `valueMultiplier`, where `valueMultiplier` is an environment vairable (by default equals to 1000 - and in such case we can say that `:sleepValue` is a number of seconds - more or less ;)).

#### Docker image

Use the "standard" procedure, run in the main project directory:

```
docker buid -t sleeping:test .
```



#### Example

##### Test1

with `sleepValue` equals 5 (with default multiplier = 1000): 

```
$ date; time http http://localhost:3000/5 -b; date
Wed Nov 16 09:02:02 CET 2022
Woke up after 5 second(s) of sleep!
...  0.35s user 0.15s system 8% cpu 5.655 total
Wed Nov 16 09:02:08 CET 2022
```

On the server console you can see something like below (i have leveraged the docker logs with timestamps):

```
$ docker run --rm -p 3000:3000 -d sleeping:test
$ docker logs -tf agitated_elgamal
2022-11-16T08:00:23.621848495Z Sleeping server listening on port 3000
2022-11-16T08:02:03.494774343Z Going to sleep for 5 second(s)!
2022-11-16T08:02:08.498342553Z Wake up! 5 second(s) passed.
```



##### Test2

Simultaneous requests:

```
$ date; for I in $(seq 5 -2 1); do \
		((http GET http://localhost:3000/$I -b | cat - && echo -n ' -- ' && date) &) \
	done
		
Wed Nov 16 09:03:47 CET 2022
Woke up after 1 second(s) of sleep! -- Wed Nov 16 09:03:48 CET 2022
Woke up after 3 second(s) of sleep! -- Wed Nov 16 09:03:50 CET 2022
Woke up after 5 second(s) of sleep! -- Wed Nov 16 09:03:52 CET 2022
```

And from "the server side":

```
2022-11-16T08:03:47.917399749Z Going to sleep for 5 second(s)!
2022-11-16T08:03:47.923730533Z Going to sleep for 1 second(s)!
2022-11-16T08:03:47.924537943Z Going to sleep for 3 second(s)!
2022-11-16T08:03:48.925443668Z Wake up! 1 second(s) passed.
2022-11-16T08:03:50.925969532Z Wake up! 3 second(s) passed.
2022-11-16T08:03:52.918711537Z Wake up! 5 second(s) passed.
```



### Configuration (environment values)

* `port` - on which port the application (server) should be listining 
* `valueMultiplier` - the multiplier for the `sleepValue` (by default 1000, what makes `seepValue` number close to seconds)









